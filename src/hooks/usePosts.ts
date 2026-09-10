import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

/** "2026-08-05T..." -> "Aug 05, 2026" to match the hand-written posts. */
export const formatPostDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export interface CmsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  color: string;
  image: string;
  read_time: string;
  published: boolean;
  published_at: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop";

export const toBlogPost = (row: CmsPost): BlogPost => ({
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  date: formatPostDate(row.published_at),
  readTime: row.read_time,
  category: row.category || "General",
  color: row.color || "primary",
  image: row.image || FALLBACK_IMAGE,
  content: row.content,
});

/** Published CMS posts merged with the built-in posts (CMS wins on slug clash). */
export const usePosts = () =>
  useQuery({
    queryKey: ["posts", "published"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Failed to load published posts:", error.message);
        return blogPosts;
      }

      const live = (data as CmsPost[]).map(toBlogPost);
      const liveSlugs = new Set(live.map((p) => p.slug));
      return [...live, ...blogPosts.filter((p) => !liveSlugs.has(p.slug))];
    },
    staleTime: 60_000,
    placeholderData: blogPosts,
  });
