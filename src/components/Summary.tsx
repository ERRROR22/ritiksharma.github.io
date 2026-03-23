import { motion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";
import { Target, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "Focus Areas",
    description: "AI/ML, Cybersecurity, and Full-Stack Development with hands-on project experience and industry internships.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Passionate about building intelligent systems — from deepfake detection to malware analysis using cutting-edge ML techniques.",
  },
  {
    icon: Rocket,
    title: "Career Goal",
    description: "Seeking entry-level roles as a Software Engineer, AI-ML Engineer, or Cybersecurity Analyst to drive real-world impact.",
  },
];

const Summary = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-primary glass glass-border rounded-full">
            {"<About />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Summary</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Final-year B.Tech CSE student at Baba Ghulam Shah Badshah University with a strong foundation in 
            software engineering, artificial intelligence, and cybersecurity. Experienced through multiple internships 
            at NIELIT, WinnoVation Labs, Bluestock Fintech, and LearnTube.ai — delivering production-ready solutions 
            in machine learning, web development, and security analysis.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.15}>
              <motion.div
                className="p-6 glass glass-border rounded-2xl h-full text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summary;
