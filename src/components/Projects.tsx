import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Shield, Image, Trophy, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "WAFinity - Advanced Web Application Firewall",
    description: "An advanced WAF that safeguards web apps from SQL injection and XSS attacks by filtering and monitoring HTTP traffic. Combines signature-based detection with machine learning for threat identification.",
    tech: ["Python", "Flask", "Machine Learning", "JavaScript", "HTML/CSS"],
    icon: Shield,
    color: "primary",
    year: "2025",
    highlights: ["Signature-based detection", "ML threat identification", "Zero-day attack detection"],
  },
  {
    title: "Text-to-Image Generator",
    description: "Production-ready generative AI application leveraging Stable Diffusion models for high-quality text-to-image synthesis with custom prompts and styling options.",
    tech: ["PyTorch", "Stable Diffusion", "Flask", "REST API"],
    icon: Image,
    color: "experience",
    year: "2024",
    highlights: ["Stable Diffusion integration", "REST API endpoints", "Custom styling"],
  },
  {
    title: "IPL Score Prediction System",
    description: "End-to-end ML system predicting cricket match scores with 85% accuracy using LSTM neural networks. Features extensive feature engineering on 500+ matches.",
    tech: ["TensorFlow", "Keras", "scikit-learn", "Feature Engineering"],
    icon: Trophy,
    color: "project",
    year: "2024",
    highlights: ["85% prediction accuracy", "LSTM neural networks", "Real-time prediction API"],
  },
  {
    title: "Secure E-Voting Platform",
    description: "Secure voting platform with end-to-end encryption, OAuth 2.0 authentication, and blockchain-inspired vote verification. OWASP Top 10 compliant.",
    tech: ["PHP", "MySQL", "JavaScript", "Security Architecture"],
    icon: Vote,
    color: "skill",
    year: "2023",
    highlights: ["End-to-end encryption", "RBAC implementation", "Penetration tested"],
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-project glass glass-border rounded-full">
            {"<Projects />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions showcasing expertise in AI, security, and full-stack development
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => {
            const colorClasses = getColorClass(project.color);

            return (
              <div
                key={project.title}
                className={`group p-6 glass rounded-2xl border ${colorClasses.border} ${colorClasses.glow} transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colorClasses.bg} group-hover:scale-110 transition-transform`}>
                    <project.icon className={`w-6 h-6 ${colorClasses.text}`} />
                  </div>
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
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className={`px-2 py-1 text-xs font-medium rounded-md ${colorClasses.bg} ${colorClasses.text}`}
                    >
                      {highlight}
                    </span>
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

                {/* Links */}
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
