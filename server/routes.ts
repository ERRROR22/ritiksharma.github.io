/**
 * Shared route knowledge used by both the dev/preview middleware and the
 * edge handler. Pure functions, zero runtime deps, so it can run in
 * Node, Deno, Bun, Cloudflare Workers or Vercel Edge.
 */

/** Static routes served by the SPA router (see src/App.tsx). */
export const STATIC_ROUTES = ["/", "/accessibility"] as const;

/** Anything with a file extension is an asset request, not an SPA navigation. */
export const isFileRequest = (pathname: string): boolean =>
  /\.[a-z0-9]+$/i.test(pathname.split("/").pop() ?? "");

/** Requests that clearly aren't browser navigations (scripts, images, fetch). */
export const isNavigationRequest = (headers: {
  get(name: string): string | null;
}): boolean => {
  const accept = headers.get("accept") ?? "";
  const mode = headers.get("sec-fetch-mode");
  if (mode) return mode === "navigate";
  return accept.includes("text/html");
};

const normalize = (pathname: string) => {
  const stripped = pathname.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
};

export interface RouteTable {
  /** Valid blog slugs, e.g. ["mcp-agents-in-production-2026"]. */
  blogSlugs: readonly string[];
  /** Optional deploy base path, e.g. "/ritiksharma.github.io/". */
  base?: string;
}

/** True when the path maps to a real SPA route (so we serve 200 + index.html). */
export const isKnownRoute = (pathname: string, table: RouteTable): boolean => {
  let path = normalize(pathname);

  const base = table.base ? normalize(table.base) : "/";
  if (base !== "/" && (path === base || path.startsWith(`${base}/`))) {
    path = normalize(path.slice(base.length)) || "/";
  }

  if ((STATIC_ROUTES as readonly string[]).includes(path)) return true;

  const blog = path.match(/^\/blog\/([^/]+)$/);
  if (blog) return table.blogSlugs.includes(decodeURIComponent(blog[1]));

  return false;
};

/**
 * Decide the status for an SPA navigation:
 * - 200 for known routes and asset requests (let the static layer answer those)
 * - 404 for unknown non-file navigations, while still serving index.html
 */
export const statusForPath = (pathname: string, table: RouteTable): 200 | 404 =>
  isFileRequest(pathname) || isKnownRoute(pathname, table) ? 200 : 404;
