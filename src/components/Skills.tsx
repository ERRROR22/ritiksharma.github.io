import { motion } from "framer-motion";
import { Code, Shield, Brain, Database, Cloud, Cpu } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "primary",
    skills: ["Python", "C++", "JavaScript", "PHP", "SQL", "HTML/CSS"],
  },
  {
    title: "Machine Learning & AI",
    icon: Brain,
    color: "experience",
    skills: ["TensorFlow", "PyTorch", "Keras", "scikit-learn", "Stable Diffusion", "Hugging Face"],
  },
  {
    title: "Web & Database",
    icon: Database,
    color: "project",
    skills: ["Flask", "MySQL", "RESTful APIs", "Git", "Linux"],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    color: "skill",
    skills: ["Vulnerability Assessment", "Threat Intelligence", "Network Security", "OWASP"],
  },
  {
    title: "Data Science",
    icon: Cpu,
    color: "experience",
    skills: ["NumPy", "Pandas", "Data Visualization", "Feature Engineering"],
  },
  {
    title: "Specializations",
    icon: Cloud,
    color: "project",
    skills: ["Deep Learning", "Generative AI", "Computer Vision", "Cloud Security"],
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
        <ScrollReveal className="text-center mb-16">
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
