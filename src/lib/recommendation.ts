import {
  recommendationProjects,
  type RecommendationCandidate,
} from "@/data/recommendationProjects";
import type { BlogPost } from "@/data/blogPosts";

export const MIN_INTERESTS = 3;
export const MAX_INTERESTS = 1000;
export const MAX_CANDIDATES = 40;
export const MAX_MATCHES = 5;

export interface MatcherMatch {
  id: string;
  kind: "project" | "article";
  reason: string;
}

export interface MatcherResponse {
  ok: true;
  introduction: string;
  matches: MatcherMatch[];
}

export interface MatchedItem {
  id: string;
  kind: "project" | "article";
  title: string;
  category: string;
  reason: string;
  href?: string;
  linkLabel?: string;
}

/** Catalog sent to the recommendation endpoint: projects plus published articles. */
export function buildMatcherCandidates(posts: BlogPost[]): RecommendationCandidate[] {
  const articleCandidates: RecommendationCandidate[] = posts.map((post) => ({
    id: post.slug,
    kind: "article",
    title: post.title,
    category: post.category,
    summary: post.excerpt,
    skills: [],
  }));
  // Keep the total within the endpoint's candidate cap (projects first).
  const articleRoom = Math.max(0, MAX_CANDIDATES - recommendationProjects.length);
  return [...recommendationProjects, ...articleCandidates.slice(0, articleRoom)];
}

/**
 * Join the model's matches against trusted local data. Unknown ids are dropped
 * so the UI can only ever display content curated in this repo.
 */
export function resolveMatches(
  matches: MatcherMatch[],
  posts: BlogPost[],
): MatchedItem[] {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const seen = new Set<string>();
  const resolved: MatchedItem[] = [];

  for (const match of matches) {
    const key = `${match.kind}:${match.id}`;
    if (seen.has(key)) continue;

    if (match.kind === "article") {
      const post = bySlug.get(match.id);
      if (!post) continue;
      seen.add(key);
      resolved.push({
        id: match.id,
        kind: "article",
        title: post.title,
        category: post.category,
        reason: match.reason,
        href: `/blog/${post.slug}`,
        linkLabel: "Read article",
      });
    } else {
      const project = recommendationProjects.find((p) => p.id === match.id);
      if (!project) continue;
      seen.add(key);
      resolved.push({
        id: match.id,
        kind: "project",
        title: project.title,
        category: project.category,
        reason: match.reason,
        href: project.link,
        linkLabel: project.link
          ? project.link.includes("github.com")
            ? "View on GitHub"
            : "Open app"
          : undefined,
      });
    }
  }

  return resolved.slice(0, MAX_MATCHES);
}
