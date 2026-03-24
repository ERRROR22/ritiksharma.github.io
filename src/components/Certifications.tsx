import { Award, ExternalLink } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";

const certifications = [
  {
    title: "TCS iON Career Edge - Young Professional",
    issuer: "TCS iON",
    color: "primary" as const,
  },
  {
    title: "TCS iON Career Edge - Interview and Job Readiness",
    issuer: "TCS iON",
    color: "experience" as const,
  },
  {
    title: "Master Data Management for Beginners",
    issuer: "TCS",
    color: "project" as const,
  },
  {
    title: "Python Libraries for Data Science",
    issuer: "SkillUp",
    color: "skill" as const,
  },
  {
    title: "Generative AI for Beginners",
    issuer: "Simplilearn",
    color: "primary" as const,
  },
];

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
        <ScrollReveal>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => {
            const colors = colorMap[cert.color];
            return (
              <ScrollReveal key={cert.title} delay={index * 0.1}>
                <div className="glass glass-border rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 h-full flex flex-col">
                  <div className={`p-3 rounded-xl border w-fit mb-4 ${colors.icon}`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                  <span className={`inline-block w-fit px-3 py-1 text-xs font-medium rounded-full border mt-auto ${colors.badge}`}>
                    {cert.issuer}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
