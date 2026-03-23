import { motion } from "framer-motion";
import { Shield, Image, Trophy, Vote } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

const projects = [
  {
    title: "WAFinity - Advanced Web Application Firewall",
    description: "An advanced WAF that safeguards web apps from SQL injection and XSS attacks by filtering and monitoring HTTP traffic. Combines signature-based detection with machine learning to identify both known and unknown threats. Its anomaly detection system spots obfuscated and zero-day attacks by analyzing request patterns and behaviors.",
    tech: ["Python", "Flask", "Machine Learning", "JavaScript", "HTML/CSS"],
    icon: Shield,
    color: "primary",
    year: "2025",
    highlights: ["Signature + ML detection", "Zero-day attack detection", "Anomaly pattern analysis"],
  },
  {
    title: "Text-to-Image Generator with Stable Diffusion",
    description: "Production-ready generative AI application leveraging Stable Diffusion models for text-to-image synthesis. Built scalable Flask API with asynchronous processing, serving 100+ requests/hour with 2-second response time. Implemented prompt engineering techniques and model fine-tuning to enhance image quality and relevance.",
    tech: ["PyTorch", "Stable Diffusion", "Flask", "REST API"],
    icon: Image,
    color: "experience",
    year: "2024",
    highlights: ["100+ requests/hour", "2s response time", "Prompt engineering"],
  },
  {
    title: "IPL Score Prediction System",
    description: "End-to-end ML system predicting cricket match scores with 85% accuracy using LSTM neural networks. Performed extensive feature engineering on 500+ matches, extracting temporal patterns and player statistics. Deployed real-time prediction API with model versioning and A/B testing capabilities.",
    tech: ["TensorFlow", "Keras", "scikit-learn", "Feature Engineering"],
    icon: Trophy,
    color: "project",
    year: "2024",
    highlights: ["85% prediction accuracy", "500+ matches analyzed", "Real-time prediction API"],
  },
  {
    title: "Secure Web-Based E-Voting Platform",
    description: "Architected secure voting platform with end-to-end encryption, OAuth 2.0 authentication, and SQL injection prevention. Implemented role-based access control (RBAC), audit logging, and blockchain-inspired vote verification system. Ensured OWASP Top 10 compliance and conducted penetration testing to validate security posture.",
    tech: ["PHP", "MySQL", "JavaScript", "Security Architecture"],
    icon: Vote,
    color: "skill",
    year: "2023",
    highlights: ["OWASP Top 10 compliant", "RBAC + audit logging", "Penetration tested"],
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
        <ScrollReveal className="text-center mb-16">
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
