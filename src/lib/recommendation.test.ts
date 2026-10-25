import { describe, expect, it } from "vitest";

import { blogPosts, type BlogPost } from "@/data/blogPosts";
import {
  buildMatcherCandidates,
  MAX_CANDIDATES,
  MAX_MATCHES,
  resolveMatches,
  type MatcherMatch,
} from "./recommendation";

const syntheticPosts: BlogPost[] = [
  {
    slug: "post-one",
    title: "Post One",
    excerpt: "Excerpt one",
    date: "Oct 01, 2026",
    readTime: "5 min read",
    category: "Cybersecurity",
    color: "experience",
    image: "",
    content: "",
  },
  {
    slug: "post-two",
    title: "Post Two",
    excerpt: "Excerpt two",
    date: "Oct 02, 2026",
    readTime: "4 min read",
    category: "Machine Learning",
    color: "primary",
    image: "",
    content: "",
  },
];

describe("buildMatcherCandidates", () => {
  it("includes every curated project and each post as an article candidate", () => {
    const candidates = buildMatcherCandidates(syntheticPosts);
    const projectIds = candidates.filter((c) => c.kind === "project").map((c) => c.id);
    const articleIds = candidates.filter((c) => c.kind === "article").map((c) => c.id);

    expect(projectIds).toEqual(["newsverify", "wafinity", "text-to-image", "ipl-prediction", "e-voting"]);
    expect(articleIds).toEqual(["post-one", "post-two"]);
    expect(candidates.every((c) => c.summary.length > 0 && c.title.length > 0)).toBe(true);
  });

  it("caps the catalog at the endpoint's 40-candidate limit", () => {
    const manyPosts: BlogPost[] = Array.from({ length: 60 }, (_, i) => ({
      ...syntheticPosts[0],
      slug: `post-${i}`,
      title: `Post ${i}`,
    }));
    const candidates = buildMatcherCandidates(manyPosts);
    expect(candidates.length).toBe(MAX_CANDIDATES);
    expect(candidates.filter((c) => c.kind === "article").length).toBe(
      MAX_CANDIDATES - 5,
    );
  });
});

describe("resolveMatches", () => {
  it("maps article matches to their /blog/ route from trusted local data", () => {
    const items = resolveMatches(
      [{ id: "post-one", kind: "article", reason: "Covers LLM evaluation." }],
      syntheticPosts,
    );
    expect(items).toEqual([
      {
        id: "post-one",
        kind: "article",
        title: "Post One",
        category: "Cybersecurity",
        reason: "Covers LLM evaluation.",
        href: "/blog/post-one",
        linkLabel: "Read article",
      },
    ]);
  });

  it("maps project matches to their curated link and label", () => {
    const items = resolveMatches(
      [{ id: "wafinity", kind: "project", reason: "Web security focus." }],
      syntheticPosts,
    );
    expect(items[0]?.href).toBe("https://github.com/ERRROR22/Advanced-WAF-WAFinity");
    expect(items[0]?.linkLabel).toBe("View on GitHub");
  });

  it("drops matches whose id is not in the local catalog", () => {
    const items = resolveMatches(
      [{ id: "not-a-real-id", kind: "project", reason: "Injected item." }],
      syntheticPosts,
    );
    expect(items).toEqual([]);
  });

  it("deduplicates and caps results at five", () => {
    const matches: MatcherMatch[] = [
      { id: "post-one", kind: "article", reason: "r1" },
      { id: "post-one", kind: "article", reason: "duplicate" },
      { id: "post-two", kind: "article", reason: "r2" },
      { id: "wafinity", kind: "project", reason: "r3" },
      { id: "text-to-image", kind: "project", reason: "r4" },
      { id: "ipl-prediction", kind: "project", reason: "r5" },
      { id: "newsverify", kind: "project", reason: "r6" },
      { id: "e-voting", kind: "project", reason: "r7" },
    ];
    const items = resolveMatches(matches, syntheticPosts);
    expect(items.length).toBe(MAX_MATCHES);
    expect(items.filter((i) => i.id === "post-one").length).toBe(1);
  });
});

describe("catalog integrity", () => {
  it("every real blog post can be recommended as an article candidate", () => {
    const candidates = buildMatcherCandidates(blogPosts);
    const articleIds = new Set(
      candidates.filter((c) => c.kind === "article").map((c) => c.id),
    );
    for (const post of blogPosts) {
      expect(articleIds.has(post.slug)).toBe(true);
    }
  });
});
