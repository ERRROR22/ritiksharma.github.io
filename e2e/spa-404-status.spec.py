"""Playwright E2E test: real HTTP 404 status for unknown non-file SPA routes.

Asserts that unknown non-file navigations respond with status 404 while still
serving the SPA shell (the client-side NotFound page renders), and that known
routes plus static file requests keep returning 200.

Run against a running dev/preview server (default http://localhost:8080):

    python3 e2e/spa-404-status.spec.py
    BASE_URL=https://example.pages.dev BASE_PATH=/ python3 e2e/spa-404-status.spec.py

Exits 0 on success, non-zero on failure.
"""

import asyncio
import os
import re
import sys
from pathlib import Path

from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080").rstrip("/")
BASE_PATH = os.environ.get("BASE_PATH", "/ritiksharma.github.io/")
SCREENSHOTS = Path("/tmp/browser/spa-404")
SCREENSHOTS.mkdir(parents=True, exist_ok=True)

failures: list[str] = []


def url_for(path: str) -> str:
    return f"{BASE_URL}{BASE_PATH.rstrip('/')}/{path.lstrip('/')}" if path else f"{BASE_URL}{BASE_PATH}"


def check(name: str, actual: object, expected: object) -> None:
    ok = actual == expected
    print(f"{'PASS' if ok else 'FAIL'} {name}: got {actual!r}, want {expected!r}")
    if not ok:
        failures.append(name)


async def run() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await context.new_page()

        # 1. Known routes still respond 200.
        for path in ("", "accessibility"):
            response = await page.goto(url_for(path), wait_until="domcontentloaded")
            check(f"GET {url_for(path)} status", response.status if response else None, 200)

        # 2. First blog slug from the rendered feed responds 200.
        blog_link = page.locator('a[href*="/blog/"]').first
        await page.goto(url_for(""), wait_until="domcontentloaded")
        blog_href = None
        try:
            await blog_link.wait_for(timeout=10_000)
            blog_href = await blog_link.get_attribute("href")
        except Exception:
            print("SKIP known blog slug check (no blog links rendered)")
        if blog_href:
            response = await page.goto(f"{BASE_URL}{blog_href}", wait_until="domcontentloaded")
            check(f"GET {blog_href} status", response.status if response else None, 200)

        # 3. Unknown non-file navigations: real 404 status + SPA shell rendered.
        for path in ("totally-unknown-route", "blog/this-slug-does-not-exist"):
            target = url_for(path)
            response = await page.goto(target, wait_until="domcontentloaded")
            check(f"GET {target} status", response.status if response else None, 404)

            # SPA shell served: React mounted and the NotFound view rendered.
            badge = page.get_by_text(re.compile(r"(page|post) not found", re.I)).first
            rendered = True
            try:
                await badge.wait_for(state="attached", timeout=15_000)
            except Exception:
                rendered = False
            check(f"{target} renders NotFound view", rendered, True)

            await page.screenshot(path=str(SCREENSHOTS / f"{path.replace('/', '_')}.png"))

        # 4. Static file requests are untouched (never rewritten to 404).
        for path in ("robots.txt", "RitikSharma-Resume.pdf"):
            target = url_for(path)
            api_response = await context.request.get(target)
            check(f"GET {target} status", api_response.status, 200)

        await context.close()
        await browser.close()

    if failures:
        print(f"\n{len(failures)} check(s) failed: {', '.join(failures)}")
        sys.exit(1)
    print("\nAll 404-status checks passed.")


if __name__ == "__main__":
    asyncio.run(run())
