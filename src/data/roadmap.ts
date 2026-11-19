export type RoadmapStatus = "done" | "in-progress" | "planned";

export type RoadmapTask = {
  title: string;
  area: string;
  status: RoadmapStatus;
};

export const roadmapTasks: RoadmapTask[] = [
  { title: "Live GitHub stats page with repositories, stars, forks and activity", area: "GitHub", status: "done" },
  { title: "GitHub link in desktop and mobile navigation", area: "GitHub", status: "done" },
  { title: "GitHub contribution heatmap from public activity", area: "GitHub", status: "done" },
  { title: "Verify GitHub page at desktop and mobile sizes", area: "Quality", status: "done" },
  { title: "Rewrite prompt-injection, LLM evaluation and production RAG posts for search", area: "Blog", status: "done" },
  { title: "SEO titles, descriptions and structured data for rewritten posts", area: "SEO", status: "done" },
  { title: "Regenerate sitemap and run project checks", area: "Quality", status: "done" },
  { title: "AI-powered interest matcher for projects and articles", area: "AI", status: "done" },
  { title: "NewsVerify case study page with problem, approach, architecture and results", area: "Projects", status: "done" },
  { title: "NewsVerify search title, description and app structured data", area: "SEO", status: "done" },
  { title: "Contact form emails each new message", area: "Contact", status: "done" },
  { title: "Public roadmap page showing task status", area: "Site", status: "done" },
  { title: "Submit sitemap to Google Search Console", area: "SEO", status: "planned" },
];
