"""Playwright visual regression test: mobile Education CGPA card.

Takes a screenshot of the CGPA card at a mobile viewport and compares it
pixel-by-pixel against a baseline image stored under
``e2e/__snapshots__/education-cgpa-mobile.png``.

Usage:

    python3 e2e/education-cgpa-mobile-visual.spec.py
    BASE_URL=https://ritiksharma.lovable.app python3 e2e/education-cgpa-mobile-visual.spec.py

    # First run (or intentional visual change): regenerate the baseline.
    UPDATE_SNAPSHOTS=1 python3 e2e/education-cgpa-mobile-visual.spec.py

Environment:
    BASE_URL           Target URL (default http://localhost:8080)
    UPDATE_SNAPSHOTS   When set to "1", writes/overwrites the baseline and passes.
    PIXEL_TOLERANCE    Max fraction of differing pixels allowed (default 0.02 = 2%).
    CHANNEL_THRESHOLD  Per-channel diff (0-255) below which a pixel is considered equal (default 16).
    BLUR_RADIUS        Gaussian blur radius applied to both images before comparison to
                       absorb antialiasing/subpixel layout noise (default 1.0 px, 0 disables).

Exits 0 on success, non-zero on failure.
"""

import asyncio
import os
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter
from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")
UPDATE_SNAPSHOTS = os.environ.get("UPDATE_SNAPSHOTS") == "1"
PIXEL_TOLERANCE = float(os.environ.get("PIXEL_TOLERANCE", "0.02"))
CHANNEL_THRESHOLD = int(os.environ.get("CHANNEL_THRESHOLD", "16"))
BLUR_RADIUS = float(os.environ.get("BLUR_RADIUS", "1.0"))

E2E_DIR = Path(__file__).parent
SNAPSHOT_DIR = E2E_DIR / "__snapshots__"
SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
BASELINE = SNAPSHOT_DIR / "education-cgpa-mobile.png"

OUT_DIR = Path("/tmp/browser/education-cgpa-mobile-visual")
OUT_DIR.mkdir(parents=True, exist_ok=True)
ACTUAL = OUT_DIR / "actual.png"
DIFF = OUT_DIR / "diff.png"


def compare_images(baseline_path: Path, actual_path: Path) -> None:
    import numpy as np

    baseline = Image.open(baseline_path).convert("RGB")
    actual = Image.open(actual_path).convert("RGB")

    if baseline.size != actual.size:
        raise AssertionError(
            f"Snapshot size mismatch: baseline={baseline.size} actual={actual.size}. "
            "Re-run with UPDATE_SNAPSHOTS=1 if this change is intentional."
        )

    # Blur both images equally so 1-2px antialiasing/layout shifts don't register
    # as hard pixel differences.
    if BLUR_RADIUS > 0:
        blur = ImageFilter.GaussianBlur(radius=BLUR_RADIUS)
        baseline_cmp = baseline.filter(blur)
        actual_cmp = actual.filter(blur)
    else:
        baseline_cmp, actual_cmp = baseline, actual

    a = np.asarray(baseline_cmp, dtype=np.int16)
    b = np.asarray(actual_cmp, dtype=np.int16)
    per_pixel_max = np.abs(a - b).max(axis=-1)
    differing = per_pixel_max > CHANNEL_THRESHOLD
    fraction = float(differing.mean())

    if fraction > 0:
        # Save a highlighted diff for debugging.
        diff_img = ImageChops.difference(baseline, actual)
        diff_img.save(DIFF)

    if fraction > PIXEL_TOLERANCE:
        raise AssertionError(
            f"Visual diff exceeds tolerance: {fraction:.4%} of pixels differ by "
            f">{CHANNEL_THRESHOLD}/255 (allowed {PIXEL_TOLERANCE:.4%}). See {DIFF}. "
            "Re-run with UPDATE_SNAPSHOTS=1 if this change is intentional."
        )


async def run() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=1,
            reduced_motion="reduce",
        )
        page = await context.new_page()

        await page.goto(BASE_URL, wait_until="domcontentloaded")

        education = page.locator("#education")
        await education.scroll_into_view_if_needed()
        await expect(education).to_be_visible(timeout=10_000)

        cgpa_card = education.locator(
            "div.bg-gradient-to-r.from-primary\\/10.to-project\\/10.border-primary\\/20"
        ).first
        await expect(cgpa_card).to_be_visible(timeout=10_000)
        # Ensure the exact label/value pair rendered before snapshotting.
        await expect(cgpa_card.get_by_text("Current CGPA", exact=True)).to_be_visible()
        await expect(cgpa_card.get_by_text("7.9/10", exact=True)).to_be_visible()

        # Let the CGPA bar animation settle.
        await page.wait_for_timeout(1500)

        await cgpa_card.screenshot(path=str(ACTUAL))

        if UPDATE_SNAPSHOTS or not BASELINE.exists():
            Image.open(ACTUAL).save(BASELINE)
            print(f"BASELINE {'updated' if UPDATE_SNAPSHOTS else 'created'}: {BASELINE}")
        else:
            compare_images(BASELINE, ACTUAL)
            print(f"PASS: mobile CGPA card matches baseline ({BASELINE})")

        await browser.close()


if __name__ == "__main__":
    try:
        asyncio.run(run())
    except Exception as exc:  # noqa: BLE001
        print(f"FAIL: {exc}", file=sys.stderr)
        sys.exit(1)
