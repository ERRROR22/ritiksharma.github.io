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
                Currently pursuing B.Tech in Computer Science Engineering at Baba Ghulam Shah Badshah University (BGSBU), Rajouri, with expected graduation in 2026. Passionate about cybersecurity, machine learning, AI, and emerging technologies like Stable Diffusion and generative models.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Excelled in academics with hands-on projects in image processing, data analysis using Python, TensorFlow, and scikit-learn, while earning certifications in Generative AI (Simplilearn), Python for Data Science, and TCS iON Career Edge. Actively explore gaming (BGMI) and tech innovations to fuel creative problem-solving.
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
              <ul className="space-y-3 text-muted-foreground text-sm">
                {["Cybersecurity & Ethical Hacking", "Machine Learning & AI", "Generative Models & Stable Diffusion", "Blockchain & Data Governance", "Gaming (BGMI)", "Tech Innovations"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
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
                Gained practical expertise as Cyber Security Intern at NIELIT, tackling vulnerability assessments, threat detection, and AI-enhanced security protocols with Hugging Face tools. ML Intern at WinnoVation involved model development and predictive systems. Data Science Intern at LearnTube.ai focused on EDA, visualization, and ML-driven insights, boosting user engagement by 20%. As SDE Intern at Bluestock Fintech, engineered scalable backend modules in an agile fintech environment, delivering 2 production-ready features and reducing code defect rate by 25% through rigorous debugging and peer code reviews.
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
                Aspiring to transition into a Cybersecurity Analyst or ML Engineer role at innovative firms, contributing to AI-powered threat mitigation and scalable solutions. Eager to pursue advanced studies or roles leveraging blockchain, neural networks, and data governance. Let's connect to innovate in Cybersecurity and AI!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
