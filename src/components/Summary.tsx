import { motion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";
import { Target, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "Focus Areas",
    description: "Applied AI/ML, agentic LLM systems, cybersecurity, and full-stack engineering across Python, TypeScript, and modern React.",
  },
  {
    icon: Lightbulb,
    title: "What I Build",
    description: "RAG pipelines, MCP-powered agents, deepfake and malware detection models, and production-ready APIs with strong test coverage.",
  },
  {
    icon: Rocket,
    title: "Career Goal",
    description: "Open to 2026 new-grad roles as an AI/ML Engineer, Full-Stack Engineer, or Cybersecurity Analyst at product-led teams.",
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
            2026 B.Tech Computer Science graduate from Baba Ghulam Shah Badshah University with a strong foundation in
            applied AI, cybersecurity, and full-stack engineering. Four internships across{" "}
            <span className="text-foreground font-medium">NIELIT, WinnoVation, LearnTube.ai, and Bluestock Fintech</span> —
            shipping ML models, agentic LLM workflows, security automations, and production backend features with a bias
            for clean code, evaluation, and measurable impact.
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
