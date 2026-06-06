import { motion } from "framer-motion";
import { Award, Tag } from "lucide-react";
import { formatCertLabel, type Certification } from "@/data/certifications";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";
import { certifications, formatCertLabel } from "@/data/certifications";

const colorMap = {
  primary: { icon: "bg-primary/10 border-primary/20 text-primary", badge: "bg-primary/10 text-primary border-primary/20" },
  experience: { icon: "bg-experience/10 border-experience/20 text-experience", badge: "bg-experience/10 text-experience border-experience/20" },
  project: { icon: "bg-project/10 border-project/20 text-project", badge: "bg-project/10 text-project border-project/20" },
  skill: { icon: "bg-skill/10 border-skill/20 text-skill", badge: "bg-skill/10 text-skill border-skill/20" },
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal scale>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-experience glass glass-border rounded-full">
              {"<Certifications />"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Certifications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications showcasing continuous learning and skill development
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.12}>
          {certifications.map((cert) => {
            const colors = colorMap[cert.color];
            const label = formatCertLabel(cert);
            return (
              <StaggerItem key={`${cert.title}-${cert.issuer}`}>
                <motion.div
                  className="glass glass-border rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 h-full flex flex-col"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className={`p-3 rounded-xl border w-fit mb-4 ${colors.icon}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Award className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2">{label}</h3>
                  <span className={`inline-block w-fit px-3 py-1 text-xs font-medium rounded-full border mt-auto ${colors.badge}`}>
                    {cert.issuer}
                  </span>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Stats strip + CTA below the grid */}
        <ScrollReveal delay={0.1}>
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="glass glass-border rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: "Certifications", value: certifications.length },
                { label: "Unique Issuers", value: new Set(certifications.map((c) => c.issuer)).size },
                { label: "Focus Areas", value: 6 },
                { label: "Hours Invested", value: "200+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 glass glass-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Always learning, always shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Credentials are verifiable on LinkedIn. New certifications added as I complete them.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/ritik-sharma-323a2724a/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors whitespace-nowrap"
              >
                Verify on LinkedIn →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Certifications;
