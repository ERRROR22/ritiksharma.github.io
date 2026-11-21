export type RoadmapStatus = "done" | "in-progress" | "planned";

export type RoadmapTask = {
  id: string;
  title: string;
  area: string;
  status: RoadmapStatus;
};

export const roadmapTasks: RoadmapTask[] = [
  { id: "github-stats", title: "Live GitHub stats page with repositories, stars, forks and activity", area: "GitHub", status: "done" },
  { id: "github-navigation", title: "GitHub link in desktop and mobile navigation", area: "GitHub", status: "done" },
  { id: "github-heatmap", title: "GitHub contribution heatmap from public activity", area: "GitHub", status: "done" },
  { id: "github-verification", title: "Verify GitHub page at desktop and mobile sizes", area: "Quality", status: "done" },
  { id: "blog-search-content", title: "Rewrite prompt-injection, LLM evaluation and production RAG posts for search", area: "Blog", status: "done" },
  { id: "blog-seo-metadata", title: "SEO titles, descriptions and structured data for rewritten posts", area: "SEO", status: "done" },
  { id: "sitemap-checks", title: "Regenerate sitemap and run project checks", area: "Quality", status: "done" },
  { id: "interest-matcher", title: "AI-powered interest matcher for projects and articles", area: "AI", status: "done" },
  { id: "newsverify-case-study", title: "NewsVerify case study page with problem, approach, architecture and results", area: "Projects", status: "done" },
  { id: "newsverify-seo", title: "NewsVerify search title, description and app structured data", area: "SEO", status: "done" },
  { id: "contact-email", title: "Contact form emails each new message", area: "Contact", status: "done" },
  { id: "public-roadmap", title: "Public roadmap page showing each task's status", area: "Site", status: "done" },
  { id: "task-tracker", title: "GitHub task tracker for updating Roadmap statuses", area: "GitHub", status: "done" },
  { id: "search-console-sitemap", title: "Submit sitemap to Google Search Console", area: "SEO", status: "planned" },
];
