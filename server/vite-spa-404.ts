import type { Plugin } from "vite";
import { statusForPath, type RouteTable } from "./routes";

/**
 * Dev/preview middleware that mirrors the edge handler: unknown non-file
 * routes still get the SPA shell, but with a 404 status code.
 */
export const spaNotFound = (table: RouteTable): Plugin => {
  const attach = (server: { middlewares: { use: (fn: unknown) => void } }) => {
    server.middlewares.use((req: any, res: any, next: () => void) => {
      const accept: string = req.headers?.accept ?? "";
      if (req.method !== "GET" || !accept.includes("text/html")) return next();

      const pathname = (req.url ?? "/").split("?")[0];
      if (statusForPath(pathname, table) === 404) {
        const write = res.writeHead.bind(res);
        res.writeHead = (status: number, ...rest: unknown[]) =>
          write(status === 200 ? 404 : status, ...rest);
      }
      next();
    });
  };

  return {
    name: "spa-not-found-status",
    configureServer: attach,
    configurePreviewServer: attach,
  };
};
