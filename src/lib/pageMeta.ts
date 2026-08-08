const SITE_URL = "https://ritiksharma.lovable.app";

type MetaConfig = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

const setTag = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  const created = !el;
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    document.head.appendChild(el);
  }
  const previous: Record<string, string | null> = {};
  Object.entries(attrs).forEach(([k, v]) => {
    previous[k] = el!.getAttribute(k);
    el!.setAttribute(k, v);
  });
  return () => {
    if (created) {
      el?.remove();
      return;
    }
    Object.entries(previous).forEach(([k, v]) => {
      if (v === null) el?.removeAttribute(k);
      else el?.setAttribute(k, v);
    });
  };
};

/**
 * Applies per-route head metadata client-side and restores the previous
 * values on cleanup. Note: static crawlers only read index.html — this
 * benefits JS-executing crawlers (Googlebot) and browser tabs/history.
 */
export const applyPageMeta = ({ title, description, path = "/", noindex }: MetaConfig) => {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const previousTitle = document.title;
  document.title = title;

  const restores = [
    setTag('meta[name="description"]', { name: "description", content: description }),
    setTag('meta[property="og:title"]', { property: "og:title", content: title }),
    setTag('meta[property="og:description"]', { property: "og:description", content: description }),
    setTag('meta[property="og:type"]', { property: "og:type", content: "website" }),
    setTag('meta[property="og:url"]', { property: "og:url", content: url }),
    setTag('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" }),
    setTag('meta[name="twitter:title"]', { name: "twitter:title", content: title }),
    setTag('meta[name="twitter:description"]', { name: "twitter:description", content: description }),
    setTag('link[rel="canonical"]', { rel: "canonical", href: url }),
  ];

  if (noindex) {
    restores.push(setTag('meta[name="robots"]', { name: "robots", content: "noindex, follow" }));
  }

  return () => {
    document.title = previousTitle;
    restores.reverse().forEach((restore) => restore());
  };
};
