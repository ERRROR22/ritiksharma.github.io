import { motion } from "framer-motion";
import { User, Target, Rocket, Gamepad2 } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";

const AboutMe = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-primary glass glass-border rounded-full">
              {"<AboutMe />"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main bio */}
          <ScrollReveal className="lg:col-span-2">
            <div className="glass glass-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Who I Am</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm Ritik Sharma — a 2026 B.Tech Computer Science graduate from Baba Ghulam Shah Badshah University (BGSBU), Rajouri, building at the intersection of <span className="text-foreground font-medium">applied AI, cybersecurity, and full-stack engineering</span>. I like turning messy problems into shipped, well-tested software: RAG pipelines, agentic LLM workflows, threat-detection tooling, and clean, accessible product UIs.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Across four internships (NIELIT, WinnoVation, LearnTube.ai, Bluestock Fintech) I've shipped ML models, security automations, analytics dashboards, and production backend modules. Day-to-day I work in Python, TypeScript/React, TensorFlow, PyTorch, and modern LLM tooling (LangChain, MCP, Hugging Face) — and I obsess over reproducibility, evaluation, and developer experience. Off-screen: BGMI, generative art with Stable Diffusion, and reading up on trust &amp; safety.
              </p>
            </div>
          </ScrollReveal>

          {/* Interests card */}
          <ScrollReveal delay={0.2}>
            <div className="glass glass-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-project/10 border border-project/20">
                  <Gamepad2 className="w-5 h-5 text-project" />
                </div>
                <h3 className="text-xl font-bold">Interests</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4 text-muted-foreground text-sm">
                {[
                  "Cybersecurity & Ethical Hacking",
                  "Machine Learning & AI",
                  "Generative Models & Stable Diffusion",
                  "Data Governance",
                  "Gaming (BGMI)",
                  { label: "Cricket — playing & watching", tags: ["IPL", "BGT", "International Cricket", "Team India fan"] },
                  "Tech Innovations",
                ].map((item) =>
                  typeof item === "string" ? (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ) : (
                    <li key={item.label} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="block leading-snug">{item.label}</span>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-md bg-primary/10 text-primary/90 border border-primary/20 leading-tight"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </ScrollReveal>

          {/* Experience summary */}
          <ScrollReveal delay={0.1}>
            <div className="glass glass-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-experience/10 border border-experience/20">
                  <Target className="w-5 h-5 text-experience" />
                </div>
                <h3 className="text-xl font-bold">Experience Highlights</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                <span className="text-foreground font-medium">NIELIT — Cyber Security Intern:</span> ran vulnerability assessments and built AI-assisted threat-detection workflows using Hugging Face tooling, hardening reference apps against OWASP Top-10 risks.{" "}
                <span className="text-foreground font-medium">WinnoVation — ML Intern:</span> designed and trained predictive models end-to-end, from feature engineering to evaluation, and shipped reproducible notebooks.{" "}
                <span className="text-foreground font-medium">LearnTube.ai — Data Science Intern:</span> owned EDA, dashboards, and ML-driven recommendations that lifted user engagement by <span className="text-foreground font-medium">20%</span>.{" "}
                <span className="text-foreground font-medium">Bluestock Fintech — SDE Intern:</span> shipped 2 production backend features in an agile squad, cut defect rate by <span className="text-foreground font-medium">25%</span> via rigorous testing and reviews, and improved API design, observability, and CI/CD. On the side: RAG systems, LLM agents, and MCP-based tool orchestration for real-world automation.
              </p>
            </div>
          </ScrollReveal>

          {/* Future goals */}
          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="glass glass-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-skill/10 border border-skill/20">
                  <Rocket className="w-5 h-5 text-skill" />
                </div>
                <h3 className="text-xl font-bold">Future Goals</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Now looking for new-grad roles as an <span className="text-foreground font-medium">AI/ML Engineer, Full-Stack Engineer, or Cybersecurity Analyst</span> at product-led teams — places where I can ship agentic LLM systems, AI-powered threat detection, and scalable, well-tested platforms end-to-end. I'm going deeper into MLOps, evaluation harnesses for LLMs, RAG and agent architectures (LangChain, MCP), and cloud security on AWS/GCP. Long-term, I want to contribute to open-source AI-security tooling, mentor early-career engineers, and pursue advanced study in AI systems and trust &amp; safety. If you're building something ambitious in AI or security — let's talk.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
