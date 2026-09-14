import { motion } from "framer-motion";
import { Radio, MapPin, Briefcase, BookOpen, Code2, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./animations/ScrollReveal";

const currentItems = {
  status: {
    label: "Open to opportunities",
    detail: "Looking for 2026 new-grad AI/ML, Full-Stack, or Security roles",
    available: true,
  },
  location: "Rajouri, Jammu & Kashmir, India",
  building: [
    "NewsVerify capstone — multimodal fake-news detector",
    "Portfolio CMS with live blog publishing",
    "RAG + MCP agent experiments",
  ],
  learning: [
    "MLOps & LLM evaluation harnesses",
    "Cloud security on AWS/GCP",
    "Agent orchestration with LangChain & MCP",
  ],
  watching: ["IPL 2026 highlights", "International cricket season", "Team India fixtures"],
};

const NowStatus = ({ compact = false }: { compact?: boolean }) => {
  return (
    <ScrollReveal>
      <div className="glass glass-border rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                <Radio className="w-5 h-5 text-primary" />
              </div>
              {currentItems.status.available && (
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">What I'm doing now</h3>
              <p className="text-xs text-muted-foreground font-mono">Last updated: Sep 2026</p>
            </div>
          </div>
          {!compact && (
            <Link
              to="/now"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Read more <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Availability */}
          <motion.div
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-500">{currentItems.status.label}</span>
            </div>
            <p className="text-sm text-muted-foreground">{currentItems.status.detail}</p>
          </motion.div>

          {/* Location */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border flex items-start gap-3">
            <MapPin className="w-4 h-4 text-project mt-0.5" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{currentItems.location}</p>
            </div>
          </div>

          {/* Building */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-4 h-4 text-experience" />
              <span className="text-sm font-semibold">Currently building</span>
            </div>
            <ul className="space-y-2">
              {currentItems.building.slice(0, compact ? 2 : undefined).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-experience flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-skill" />
              <span className="text-sm font-semibold">Currently learning</span>
            </div>
            <ul className="space-y-2">
              {currentItems.learning.slice(0, compact ? 2 : undefined).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-skill flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!compact && (
          <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Also into</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentItems.watching.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default NowStatus;
