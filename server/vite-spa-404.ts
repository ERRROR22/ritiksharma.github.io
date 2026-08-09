import type { Connect, Plugin, PreviewServer, ViteDevServer } from "vite";
import { statusForPath, type RouteTable } from "./routes";

/**
 * Dev/preview middleware that mirrors the edge handler: unknown non-file
 * routes still get the SPA shell, but with a 404 status code.
 */
export const spaNotFound = (table: RouteTable): Plugin => {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const accept = req.headers?.accept ?? "";
    if (req.method !== "GET" || !accept.includes("text/html")) return next();

    const pathname = (req.url ?? "/").split("?")[0];
    if (statusForPath(pathname, table) === 404) {
      const write = res.writeHead.bind(res);
      res.writeHead = ((status: number, ...rest: unknown[]) =>
        write(status === 200 ? 404 : status, ...(rest as []))) as typeof res.writeHead;
    }
    next();
  };

  const attach = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use(middleware);
  };

  return {
    name: "spa-not-found-status",
    configureServer: attach,
    configurePreviewServer: attach,
  };
};
