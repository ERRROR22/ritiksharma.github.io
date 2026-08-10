/**
 * Cloudflare Pages middleware: serve the SPA shell for every navigation, but
 * answer unknown non-file routes with a real HTTP 404 status so crawlers treat
 * them correctly.
 *
 * Deploy: Cloudflare Pages picks up `functions/_middleware.ts` automatically.
 * Build command: `npm run build`, output directory: `dist`.
 */
import { createSpaNotFoundHandler } from "../server/edge-not-found";
import { blogPosts } from "../src/data/blogPosts";

const handle = createSpaNotFoundHandler({
  blogSlugs: blogPosts.map((post) => post.slug),
});

export const onRequest = ({
  request,
  next,
}: {
  request: Request;
  next: () => Promise<Response>;
}) => handle(request, () => next());
