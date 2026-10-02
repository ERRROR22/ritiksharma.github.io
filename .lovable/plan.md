# Add GitHub stats page

## Build
- Add a `/github` page linked from both desktop and mobile navigation.
- Load Ritik’s public profile, repositories, and recent public events directly from GitHub.
- Show total repositories, stars, forks, and recent activity, followed by a scannable repository list.
- Include clear loading, empty, retry, and GitHub rate-limit states.
- Add page-specific title, description, canonical URL, and profile structured data.
- Register the page in the sitemap and known-route list.

## Verification
- Confirm the page works at desktop and mobile sizes.
- Confirm live repository totals and recent activity render.
- Re-open the prompt-injection, LLM evaluation, and production RAG articles and verify their rewritten content and structured data.
- Regenerate the sitemap and run the existing checks.

## Technical details
- Use GitHub’s unauthenticated public REST endpoints; no visitor login or private repository access.
- Cache responses through the existing query library and avoid unnecessary repeat requests.
