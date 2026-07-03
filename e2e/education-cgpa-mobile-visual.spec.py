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
    PIXEL_TOLERANCE    Max fraction of differing pixels allowed (default 0.01 = 1%).

Exits 0 on success, non-zero on failure.
"""

import asyncio
import os
import sys
from pathlib import Path

from PIL import Image, ImageChops
from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")
UPDATE_SNAPSHOTS = os.environ.get("UPDATE_SNAPSHOTS") == "1"
PIXEL_TOLERANCE = float(os.environ.get("PIXEL_TOLERANCE", "0.01"))

E2E_DIR = Path(__file__).parent
SNAPSHOT_DIR = E2E_DIR / "__snapshots__"
SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
BASELINE = SNAPSHOT_DIR / "education-cgpa-mobile.png"

OUT_DIR = Path("/tmp/browser/education-cgpa-mobile-visual")
OUT_DIR.mkdir(parents=True, exist_ok=True)
ACTUAL = OUT_DIR / "actual.png"
DIFF = OUT_DIR / "diff.png"


def compare_images(baseline_path: Path, actual_path: Path) -> None:
    baseline = Image.open(baseline_path).convert("RGB")
    actual = Image.open(actual_path).convert("RGB")

    if baseline.size != actual.size:
        raise AssertionError(
            f"Snapshot size mismatch: baseline={baseline.size} actual={actual.size}. "
            "Re-run with UPDATE_SNAPSHOTS=1 if this change is intentional."
        )

    diff = ImageChops.difference(baseline, actual)
    # Count pixels that differ at all (any channel).
    bbox = diff.getbbox()
    if bbox is None:
        return  # identical

    # Compute fraction of differing pixels.
    diff_pixels = sum(1 for p in diff.getdata() if p != (0, 0, 0))
    total = baseline.size[0] * baseline.size[1]
    fraction = diff_pixels / total

    # Save diff for debugging.
    diff.save(DIFF)

    if fraction > PIXEL_TOLERANCE:
        raise AssertionError(
            f"Visual diff exceeds tolerance: {fraction:.4%} of pixels differ "
            f"(allowed {PIXEL_TOLERANCE:.4%}). See {DIFF}. "
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
