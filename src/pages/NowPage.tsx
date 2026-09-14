import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Radio, Calendar, MapPin, Briefcase, Code2, BookOpen, Sparkles, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NowStatus from "@/components/NowStatus";
import { applyPageMeta } from "@/lib/pageMeta";

const NowPage = () => {
  useEffect(() => {
    const restore = applyPageMeta({
      title: "Now — Ritik Sharma",
      description:
        "What Ritik Sharma is working on right now: AI/ML projects, job search, learning goals, and current interests.",
      path: "/now",
      type: "website",
    });
    return restore;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-6 -ml-3 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to portfolio
            </Button>
          </Link>

          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-mono text-primary glass glass-border rounded-full">
              <Radio className="w-4 h-4" />
              /now
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What I'm <span className="text-gradient">doing now</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A living status page inspired by the{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                /now movement
              </a>
              . Updated September 2026.
            </p>
          </div>

          <NowStatus />

          <div className="mt-8 glass glass-border rounded-2xl p-6 md:p-8 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-bold">Work status</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I'm actively looking for 2026 new-grad roles as an{" "}
                <span className="text-foreground font-medium">AI/ML Engineer, Full-Stack Engineer, or Cybersecurity Analyst</span>. I'm open to remote, hybrid, or on-site opportunities in India and globally. If you're building something ambitious in AI or security, I'd love to talk.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-5 h-5 text-experience" />
                <h2 className="text-xl font-bold">Current projects</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "NewsVerify — B.Tech CSE capstone: a dual-engine (PAC + Gemini 2.5 Flash) multimodal fake-news detector with sub-2s credibility scoring.",
                  "Portfolio CMS — a live blog editor and contact inbox built with React, Supabase, and edge functions.",
                  "RAG + MCP experiments — building agentic workflows that can query documents and call tools through the Model Context Protocol.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-experience flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-skill" />
                <h2 className="text-xl font-bold">Learning focus</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "MLOps: model versioning, evaluation harnesses, and production monitoring for LLMs.",
                  "Cloud security fundamentals on AWS and GCP, including IAM, VPCs, and threat detection.",
                  "Advanced agent architectures: planning, memory, and tool use with LangChain and MCP.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-skill flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Gamepad2 className="w-5 h-5 text-project" />
                <h2 className="text-xl font-bold">Outside tech</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Following cricket closely — IPL, Border-Gavaskar Trophy, and International Cricket. Team India fan. I also play BGMI and explore generative art with Stable Diffusion when I need a break from code.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Recent wins</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "Shipped a real contact form that delivers messages straight to my Gmail inbox.",
                  "Added a live CMS to my portfolio so I can publish blog posts without editing code.",
                  "Built and deployed a Cloudflare Pages middleware that returns real HTTP 404s for unknown routes.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Based in Rajouri, Jammu & Kashmir, India
              </div>
              <Link to="/contact">
                <Button className="bg-gradient-primary text-primary-foreground font-semibold">
                  Get in touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPage;
