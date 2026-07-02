"""Playwright integration test: Education section CGPA on mobile viewport.

Run against a running dev/preview server (default http://localhost:8080):

    python3 e2e/education-cgpa-mobile.spec.py
    BASE_URL=https://ritiksharma.lovable.app python3 e2e/education-cgpa-mobile.spec.py

Exits 0 on success, non-zero on failure.
"""

import asyncio
import os
import sys
from pathlib import Path

from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")
SCREENSHOTS = Path("/tmp/browser/education-cgpa-mobile")
SCREENSHOTS.mkdir(parents=True, exist_ok=True)


async def run() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 390, "height": 844})
        page = await context.new_page()

        await page.goto(BASE_URL, wait_until="domcontentloaded")

        # Education uses LazySection + framer-motion whileInView, so scroll it in.
        education = page.locator("#education")
        await education.scroll_into_view_if_needed()
        await expect(education).to_be_visible(timeout=10_000)

        # Locate the CGPA card and assert the exact label/value pair inside it.
        cgpa_card = education.locator(
            "div.bg-gradient-to-r.from-primary\\/10.to-project\\/10.border-primary\\/20"
        ).first
        await expect(cgpa_card).to_be_visible(timeout=10_000)

        label = cgpa_card.get_by_text("Current CGPA", exact=True)
        value = cgpa_card.get_by_text("7.9/10", exact=True)

        await expect(label).to_be_visible(timeout=10_000)
        await expect(value).to_be_visible(timeout=10_000)


        await education.screenshot(path=str(SCREENSHOTS / "education-mobile.png"))
        print(f"PASS: Education CGPA renders as 7.9/10 on mobile at {BASE_URL}")

        await browser.close()


if __name__ == "__main__":
    try:
        asyncio.run(run())
    except Exception as exc:  # noqa: BLE001
        print(f"FAIL: {exc}", file=sys.stderr)
        sys.exit(1)
