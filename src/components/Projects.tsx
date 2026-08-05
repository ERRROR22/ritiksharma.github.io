import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Image, Trophy, Vote, Newspaper, ExternalLink, Github, Search, Eye } from "lucide-react";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";
import newsverify1 from "@/assets/projects/newsverify-1.jpg";
import newsverify2 from "@/assets/projects/newsverify-2.jpg";
import wafinityImg from "@/assets/projects/wafinity.jpg";
import textToImageImg from "@/assets/projects/text-to-image.jpg";
import iplScoreImg from "@/assets/projects/ipl-score.jpg";
import eVotingImg from "@/assets/projects/e-voting.jpg";

const projects = [
  {
    title: "NewsVerify — Multimodal Real-Time Fake News Detection (ML + Gemini 2.5 Flash)",
    description: "Final-year B.Tech CSE capstone (Team Tech Titans, BGSBU Rajouri, 2022–2026) led as Team Lead & Backend — owning AI pipeline and API architecture. Dual-engine system pairing a Passive Aggressive Classifier on TF-IDF features with Gemini 2.5 Flash + Google Search grounding for live fact-checking. The 7-stage NLP pipeline (regex cleaning → lowercasing → NLTK tokenization → 170+ stopword removal → lemmatization → TF-IDF vectorization → PAC classification) reaches ~96% accuracy on 30K+ Kaggle articles supplemented by the LIAR dataset (Precision 95.1%, Recall 97.0%, F1 96.0%; confusion matrix on 6K test set — TP 2,910, TN 2,850, FP 150, FN 90). Gemini extracts claims, verifies them via live web search grounding, and returns 0–100 truth scores with claim-by-claim reasoning and direct source citations. Cross-platform Expo / React Native app supports three input modes — Text (≥15 chars), URL (fetch & analyze), and Image (OCR from screenshots) — through a typed Node.js/Express + Zod backend in a pnpm monorepo with a health-check endpoint, deployed on Replit Cloud. Evolved from a static Flask Phase-I NLP tool into a real-time multimodal Phase-II app, with a roadmap covering multi-language support (Hindi, Urdu, regional), a browser extension, and push alerts for trending misinformation.",
    tech: ["React Native", "Expo SDK 52", "TypeScript", "Node.js", "Express", "Zod", "Gemini 2.5 Flash", "Google Search Grounding", "scikit-learn", "NLTK", "Pandas", "Python 3.9+"],
    icon: Newspaper,
    color: "primary",
    year: "2026",
    highlights: ["~96% accuracy · F1 96.0 on 6K test set", "Gemini 2.5 Flash + live Search grounding", "Text · URL · Image (OCR) input modes", "Phase-I → Phase-II real-time upgrade"],
    appLink: "https://truth-verifier--Techtitans999.replit.app",
    category: "Full-Stack",
    screenshots: ["placeholder.svg", "placeholder.svg", "placeholder.svg"],
  },
  {
    title: "WAFinity - Advanced Web Application Firewall",
    description: "An advanced WAF that safeguards web apps from SQL injection, XSS, CSRF, and zero-day payloads by filtering and monitoring HTTP traffic. Combines signature-based detection with a Random Forest classifier trained on 50K labeled HTTP traffic samples to score every incoming request. Its anomaly detection system spots obfuscated and zero-day attacks by analyzing request patterns and behaviors.",
    tech: ["Python", "Flask", "scikit-learn", "Machine Learning", "JavaScript"],
    icon: Shield,
    color: "experience",
    year: "2025",
    highlights: ["50K-sample RF classifier", "Zero-day detection", "No-redeploy rule updates"],
    githubLink: "https://github.com/ERRROR22/Advanced-WAF-WAFinity",
    category: "Cybersecurity",
    screenshots: ["placeholder.svg", "placeholder.svg"],
  },
  {
    title: "Text-to-Image Generator with Stable Diffusion",
    description: "Production-ready generative AI application leveraging Stable Diffusion v1.5 for text-to-image synthesis. Built a scalable Flask API with an asynchronous 4-worker queue, sustaining 100+ requests/hour at 2s average latency. Fine-tuned on a 2,000-image domain dataset with LoRA-based prompt calibration to lift output visual fidelity by 20%.",
    tech: ["PyTorch", "Stable Diffusion", "Flask", "LoRA", "REST API"],
    icon: Image,
    color: "project",
    year: "2024",
    highlights: ["100+ requests/hour", "2s avg latency", "+20% visual fidelity"],
    githubLink: "https://github.com/ERRROR22/ML_Minor_Project",
    category: "AI/ML",
    screenshots: ["placeholder.svg", "placeholder.svg"],
  },
  {
    title: "IPL Score Prediction System",
    description: "End-to-end ML system predicting cricket match scores with 85% accuracy using a 3-layer LSTM trained on 500+ IPL records with 18 engineered features spanning venue, over number, and player form. Released a FastAPI endpoint with semantic version tagging, Prometheus metrics, and weekly automated retraining triggers.",
    tech: ["TensorFlow", "Keras", "scikit-learn", "FastAPI", "Prometheus"],
    icon: Trophy,
    color: "skill",
    year: "2024",
    highlights: ["85% prediction accuracy", "18 engineered features", "Weekly auto-retraining"],
    githubLink: "https://github.com/ERRROR22/IPL-Score-Prediction-ML-Project",
    category: "AI/ML",
    screenshots: ["placeholder.svg", "placeholder.svg"],
  },
  {
    title: "Secure Web-Based E-Voting Platform",
    description: "Architected a secure voting platform with AES-256 encryption, OAuth 2.0 authentication, RBAC across 3 privilege tiers, and a Merkle-tree-inspired tamper-proof audit log. Certified zero OWASP Top 10 vulnerabilities by conducting manual and scripted penetration tests with Burp Suite and OWASP ZAP prior to release.",
    tech: ["PHP", "MySQL", "JavaScript", "OAuth 2.0", "Security Architecture"],
    icon: Vote,
    color: "primary",
    year: "2023",
    highlights: ["AES-256 + OAuth 2.0", "3-tier RBAC", "Zero OWASP Top 10"],
    category: "Cybersecurity",
    screenshots: ["placeholder.svg", "placeholder.svg"],
  },
];

const categories = ["All", "AI/ML", "Cybersecurity", "Full-Stack"];

const Projects = () => {
  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/30 hover:border-primary/60",
        text: "text-primary",
        glow: "hover:shadow-[0_0_30px_hsl(174_72%_56%/0.2)]",
      },
      experience: {
        bg: "bg-experience/10",
        border: "border-experience/30 hover:border-experience/60",
        text: "text-experience",
        glow: "hover:shadow-[0_0_30px_hsl(280_80%_60%/0.2)]",
      },
      project: {
        bg: "bg-project/10",
        border: "border-project/30 hover:border-project/60",
        text: "text-project",
        glow: "hover:shadow-[0_0_30px_hsl(199_89%_48%/0.2)]",
      },
      skill: {
        bg: "bg-skill/10",
        border: "border-skill/30 hover:border-skill/60",
        text: "text-skill",
        glow: "hover:shadow-[0_0_30px_hsl(174_72%_56%/0.2)]",
      },
    };
    return colors[color] || colors.primary;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const searchable = [
        project.title,
        project.description,
        project.year,
        project.category,
        ...project.tech,
        ...project.highlights,
      ].join(" ").toLowerCase();
      return searchable.includes(query);
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16" scale>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-project glass glass-border rounded-full">
            {"<Projects />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions showcasing expertise in AI, security, and full-stack development
          </p>
        </ScrollReveal>

        {/* Search & filters */}
        <ScrollReveal className="mb-10" scale>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between max-w-5xl mx-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 glass glass-border bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    role="tab"
                    aria-selected={isActive}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                        ? "bg-primary text-primary-foreground glow-primary"
                        : "glass glass-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <StaggerContainer
              key={`${activeCategory}-${searchQuery}`}
              className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              staggerDelay={0.15}
            >
              {filteredProjects.map((project) => {
                const colorClasses = getColorClass(project.color);

                return (
                  <StaggerItem key={project.title}>
                    <motion.div
                      className={`group p-6 glass rounded-2xl border ${colorClasses.border} ${colorClasses.glow} transition-all duration-500 h-full flex flex-col`}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className={`p-3 rounded-xl ${colorClasses.bg}`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <project.icon className={`w-6 h-6 ${colorClasses.text}`} />
                        </motion.div>
                        <span className="text-sm font-mono text-muted-foreground">{project.year}</span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.highlights.map((highlight, index) => (
                          <motion.span
                            key={highlight}
                            className={`px-2 py-1 text-xs font-medium rounded-md ${colorClasses.bg} ${colorClasses.text}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono text-muted-foreground bg-secondary/50 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links & detail trigger */}
                      <div className="flex flex-wrap items-center gap-4 mt-auto">
                        {project.appLink && (
                          <a
                            href={project.appLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open App (Expo Go)
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-20 max-w-5xl mx-auto glass glass-border rounded-2xl"
            >
              <p className="text-muted-foreground text-lg mb-2">No projects found</p>
              <p className="text-sm text-muted-foreground/70">
                Try a different search term or category filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 glass border-border/50 overflow-hidden">
          {selectedProject && (
            <>
              <ScrollArea className="max-h-[90vh]">
                <div className="p-6">
                  <DialogHeader className="mb-6 pr-10">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`p-3 rounded-xl shrink-0 ${getColorClass(selectedProject.color).bg}`}>
                        <selectedProject.icon className={`w-7 h-7 ${getColorClass(selectedProject.color).text}`} />
                      </div>
                      <div className="text-left min-w-0">
                        <DialogTitle className="text-xl md:text-2xl leading-tight">
                          {selectedProject.title}
                        </DialogTitle>
                        <DialogDescription className="text-sm font-mono mt-1">
                          {selectedProject.year} · {selectedProject.category}
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>

                  {/* Screenshots carousel */}
                  {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                    <div className="mb-6">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {selectedProject.screenshots.map((screenshot, index) => (
                            <CarouselItem key={index}>
                              <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 bg-secondary/30">
                                <img
                                  src={screenshot}
                                  alt={`${selectedProject.title} screenshot ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 bg-background/80 hover:bg-background border-border/50" />
                        <CarouselNext className="right-2 bg-background/80 hover:bg-background border-border/50" />
                      </Carousel>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      About
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className={`px-3 py-1 text-sm font-medium rounded-md ${getColorClass(selectedProject.color).bg} ${getColorClass(selectedProject.color).text}`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm font-mono text-muted-foreground bg-secondary/50 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action links */}
                  <div className="flex flex-wrap items-center gap-4">
                    {selectedProject.appLink && (
                      <a
                        href={selectedProject.appLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open App
                      </a>
                    )}
                    {selectedProject.githubLink && (
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium glass glass-border rounded-lg hover:border-primary/40 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        View Repository
                      </a>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
