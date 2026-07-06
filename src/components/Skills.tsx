import { motion } from "framer-motion";
import { Code, Shield, Brain, Database, Cloud, Cpu } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "primary",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Database,
    color: "project",
    skills: ["Node.js", "Express", "Flask", "FastAPI", "REST APIs", "Python"],
  },
  {
    title: "AI/ML & Tools",
    icon: Brain,
    color: "experience",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "scikit-learn",
      "XGBoost",
      "Stable Diffusion",
      "Hugging Face",
      "LangChain",
      "RAG Pipelines",
      "LLM Fine-tuning",
      "Prompt Engineering",
      "MCP (Model Context Protocol)",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Statistical Modeling",
      "Feature Engineering",
      "A/B Testing",
    ],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    color: "skill",
    skills: [
      "Vulnerability Assessment",
      "Penetration Testing",
      "Threat Intelligence",
      "Network Security",
      "OWASP Top 10",
      "Burp Suite",
      "Wireshark",
      "Nmap",
      "Metasploit",
      "SIEM",
    ],
  },
  {
    title: "Databases & Storage",
    icon: Database,
    color: "primary",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Supabase", "Vector DBs (Pinecone, FAISS)"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "project",
    skills: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Git", "Linux"],
  },
];

const Skills = () => {
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: "text-primary border-primary/30 bg-primary/5",
      experience: "text-experience border-experience/30 bg-experience/5",
      project: "text-project border-project/30 bg-project/5",
      skill: "text-skill border-skill/30 bg-skill/5",
    };
    return colors[color] || colors.primary;
  };

  const getIconBg = (color: string) => {
    const colors: Record<string, string> = {
      primary: "bg-primary/10 text-primary",
      experience: "bg-experience/10 text-experience",
      project: "bg-project/10 text-project",
      skill: "bg-skill/10 text-skill",
    };
    return colors[color] || colors.primary;
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16" scale>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-primary glass glass-border rounded-full">
            {"<Skills />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A diverse skill set spanning cybersecurity, machine learning, and full-stack development
          </p>
        </ScrollReveal>

        {/* Skills grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {skillCategories.map((category) => (
            <StaggerItem key={category.title}>
              <motion.div
                className="group p-6 glass glass-border rounded-2xl hover:shadow-elevated transition-shadow duration-500 h-full"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-5">
                  <motion.div 
                    className={`p-3 rounded-xl ${getIconBg(category.color)}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <category.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${getColorClass(category.color)}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Skills;
