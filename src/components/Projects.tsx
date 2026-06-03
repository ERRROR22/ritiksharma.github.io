import { motion } from "framer-motion";
import { Shield, Image, Trophy, Vote, Newspaper } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

const projects = [
  {
    title: "NewsVerify — Fake News Detector (ML + Gemini 2.5 Flash)",
    description: "B.Tech CSE final-year capstone (Team Tech Titans, BGSBU Rajouri) led as Team Lead & Backend. Dual-engine fake-news detector pairing a Passive Aggressive Classifier on TF-IDF features (~96% accuracy on 30K+ Kaggle articles, 80/20 stratified split) with Gemini 2.5 Flash + Google Search grounding for live fact-checking, claim-by-claim reasoning, and 0–100 truth scoring. Cross-platform Expo / React Native app supports Text, URL, and Image (OCR) inputs through a typed Node.js/Express + Zod backend in a pnpm monorepo.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "Gemini 2.5 Flash", "scikit-learn", "NLTK", "Python"],
    icon: Newspaper,
    color: "primary",
    year: "2026",
    highlights: ["96% PAC accuracy on 30K+ articles", "Gemini 2.5 Flash + Search grounding", "Text · URL · Image input modes"],
  },
  {
    title: "WAFinity - Advanced Web Application Firewall",
    description: "An advanced WAF that safeguards web apps from SQL injection, XSS, CSRF, and zero-day payloads by filtering and monitoring HTTP traffic. Combines signature-based detection with a Random Forest classifier trained on 50K labeled HTTP traffic samples to score every incoming request. Its anomaly detection system spots obfuscated and zero-day attacks by analyzing request patterns and behaviors.",
    tech: ["Python", "Flask", "scikit-learn", "Machine Learning", "JavaScript"],
    icon: Shield,
    color: "experience",
    year: "2025",
    highlights: ["50K-sample RF classifier", "Zero-day detection", "No-redeploy rule updates"],
  },
  {
    title: "Text-to-Image Generator with Stable Diffusion",
    description: "Production-ready generative AI application leveraging Stable Diffusion v1.5 for text-to-image synthesis. Built a scalable Flask API with an asynchronous 4-worker queue, sustaining 100+ requests/hour at 2s average latency. Fine-tuned on a 2,000-image domain dataset with LoRA-based prompt calibration to lift output visual fidelity by 20%.",
    tech: ["PyTorch", "Stable Diffusion", "Flask", "LoRA", "REST API"],
    icon: Image,
    color: "project",
    year: "2024",
    highlights: ["100+ requests/hour", "2s avg latency", "+20% visual fidelity"],
  },
  {
    title: "IPL Score Prediction System",
    description: "End-to-end ML system predicting cricket match scores with 85% accuracy using a 3-layer LSTM trained on 500+ IPL records with 18 engineered features spanning venue, over number, and player form. Released a FastAPI endpoint with semantic version tagging, Prometheus metrics, and weekly automated retraining triggers.",
    tech: ["TensorFlow", "Keras", "scikit-learn", "FastAPI", "Prometheus"],
    icon: Trophy,
    color: "skill",
    year: "2024",
    highlights: ["85% prediction accuracy", "18 engineered features", "Weekly auto-retraining"],
  },
  {
    title: "Secure Web-Based E-Voting Platform",
    description: "Architected a secure voting platform with AES-256 encryption, OAuth 2.0 authentication, RBAC across 3 privilege tiers, and a Merkle-tree-inspired tamper-proof audit log. Certified zero OWASP Top 10 vulnerabilities by conducting manual and scripted penetration tests with Burp Suite and OWASP ZAP prior to release.",
    tech: ["PHP", "MySQL", "JavaScript", "OAuth 2.0", "Security Architecture"],
    icon: Vote,
    color: "primary",
    year: "2023",
    highlights: ["AES-256 + OAuth 2.0", "3-tier RBAC", "Zero OWASP Top 10"],
  },
];

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

        {/* Projects grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
          {projects.map((project) => {
            const colorClasses = getColorClass(project.color);

            return (
              <StaggerItem key={project.title}>
                <motion.div
                  className={`group p-6 glass rounded-2xl border ${colorClasses.border} ${colorClasses.glow} transition-all duration-500 h-full`}
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

                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Projects;
