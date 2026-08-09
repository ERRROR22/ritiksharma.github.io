/**
 * Portable edge handler: serves the SPA shell for every navigation, but with a
 * real HTTP 404 status for unknown non-file routes so crawlers treat them
 * correctly. Works on any Fetch-API runtime (Cloudflare Workers/Pages
 * Functions, Vercel Edge, Deno Deploy, Supabase Edge Functions).
 *
 * Cloudflare Pages example — functions/_middleware.ts:
 *   import { createSpaNotFoundHandler } from "../server/edge-not-found";
 *   import { blogPosts } from "../src/data/blogPosts";
 *   const handle = createSpaNotFoundHandler({
 *     blogSlugs: blogPosts.map((p) => p.slug),
 *   });
 *   export const onRequest: PagesFunction = ({ request, next }) =>
 *     handle(request, () => next());
 */
import {
  isFileRequest,
  isKnownRoute,
  isNavigationRequest,
  type RouteTable,
} from "./routes";

type NextFn = (request: Request) => Promise<Response> | Response;

export const createSpaNotFoundHandler = (table: RouteTable) => {
  return async (request: Request, next: NextFn): Promise<Response> => {
    const response = await next(request);
    const { pathname } = new URL(request.url);

    // Only touch HTML navigations that the static layer answered with the shell.
    if (request.method !== "GET" && request.method !== "HEAD") return response;
    if (!isNavigationRequest(request.headers)) return response;
    if (isFileRequest(pathname)) return response;
    if (response.status !== 200) return response;
    if (!(response.headers.get("content-type") ?? "").includes("text/html")) {
      return response;
    }
    if (isKnownRoute(pathname, table)) return response;

    // Same body (the SPA renders its own 404 view), corrected status.
    return new Response(response.body, {
      status: 404,
      statusText: "Not Found",
      headers: response.headers,
    });
  };
};
