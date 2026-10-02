# Update SEO for the three rewritten blog posts

## Changes
- Align each rewritten post’s search title and description with its current article focus and target query.
- Expand each post’s `BlogPosting` structured data with its canonical URL, author URL, publication date, image, and topic metadata.
- Convert visible FAQ sections into matching `FAQPage` structured data without adding claims that are not on the page.
- Keep canonical and social metadata self-referencing for every article.

## Validation
- Regenerate the sitemap.
- Run the TypeScript checks and automated tests.
- Open all three article URLs and confirm their metadata and JSON-LD appear correctly in the rendered page.

## Technical details
- Structured data will be emitted as one Schema.org `@graph` containing `BlogPosting` and, when present, `FAQPage`.
- FAQ entries will be parsed only from the article’s visible `## Frequently Asked Questions` section and `###` question headings.
