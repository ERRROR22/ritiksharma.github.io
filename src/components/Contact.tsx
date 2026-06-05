import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Award, Trophy, Medal, Users, Shield, Target, Sparkles, type LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./animations/ScrollReveal";

import { getCertLabels } from "@/data/certifications";

const certifications = getCertLabels();

type AchievementColor = "experience" | "primary" | "project" | "skill";

type Achievement = {
  icon: LucideIcon;
  title: string;
  detail: string;
  color: AchievementColor;
};

type AchievementGroup = {
  heading: string;
  icon: LucideIcon;
  items: Achievement[];
};

const achievementGroups: AchievementGroup[] = [
  {
    heading: "Awards & Rankings",
    icon: Trophy,
    items: [
      {
        icon: Trophy,
        title: "Rank 293 — Top 6% Nationally",
        detail: "Elite Coders Winter of Code (WOC) — out of 5,000+ participants across DSA & competitive programming",
        color: "experience",
      },
      {
        icon: Medal,
        title: "National Finalist — Essay Stage",
        detail: "MY Bharat Budget Quest — shortlisted for the final round on Union Budget & macroeconomic policy",
        color: "primary",
      },
    ],
  },
  {
    heading: "Leadership",
    icon: Users,
    items: [
      {
        icon: Users,
        title: "Team Lead & Backend — NewsVerify (Tech Titans)",
        detail: "Led a 4-person B.Tech CSE capstone team (BGSBU Rajouri, 2022–2026) — owned AI pipeline and API architecture, delivering a dual-engine (PAC + Gemini 2.5 Flash) multimodal fake-news detector at ~96% accuracy with sub-2s credibility scoring",
        color: "project",
      },
    ],
  },
  {
    heading: "Project & Engineering Milestones",
    icon: Sparkles,
    items: [
      {
        icon: Shield,
        title: "Zero OWASP Top 10 Vulnerabilities",
        detail: "Secure E-Voting Platform — hardened with AES-256, OAuth 2.0, RBAC, and Burp Suite / OWASP ZAP audits",
        color: "primary",
      },
      {
        icon: Target,
        title: "92% Prediction Accuracy",
        detail: "WinnoVation predictive maintenance ML pipeline — grid-search tuning across 3 neural architectures",
        color: "skill",
      },
      {
        icon: Sparkles,
        title: "85% Match Score Accuracy",
        detail: "IPL Score Prediction — 3-layer LSTM on 500+ records with 18 engineered features",
        color: "experience",
      },
      {
        icon: Target,
        title: "+20% User Engagement, -12% Churn",
        detail: "LearnTube.ai recommendation engine validated via a 4-week A/B experiment on 1M+ user records",
        color: "project",
      },
      {
        icon: Shield,
        title: "10 Critical Vulnerabilities Remediated",
        detail: "NIELIT — reduced attack surface by 40% and lifted anomaly detection accuracy by 25% via Hugging Face Transformers",
        color: "primary",
      },
      {
        icon: Sparkles,
        title: "$50K Annual Cost Reduction",
        detail: "Shipped scalable ML models to production at WinnoVation, cutting maintenance overhead",
        color: "skill",
      },
    ],
  },
];

const colorMap: Record<AchievementColor, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  experience: { bg: "bg-experience/10", text: "text-experience", border: "border-experience/20" },
  project: { bg: "bg-project/10", text: "text-project", border: "border-project/20" },
  skill: { bg: "bg-skill/10", text: "text-skill", border: "border-skill/20" },
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16" scale>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-primary glass glass-border rounded-full">
            {"<Contact />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal direction="left" className="space-y-8">
            {/* Contact details */}
            <div className="space-y-4">
              <a 
                href="mailto:ritiksharma4451@gmail.com"
                className="flex items-center gap-4 p-4 glass glass-border rounded-xl hover:bg-secondary/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">ritiksharma4451@gmail.com</p>
                </div>
              </a>

              <a 
                href="tel:+917889465949"
                className="flex items-center gap-4 p-4 glass glass-border rounded-xl hover:bg-secondary/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-project/10 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-project" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 7889465949</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass glass-border rounded-xl">
                <div className="p-3 rounded-xl bg-experience/10">
                  <MapPin className="w-5 h-5 text-experience" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Rajouri, Jammu & Kashmir, India</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/ritik-sharma-323a2724a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-4 glass glass-border rounded-xl hover:bg-secondary/30 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/ERRROR22"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-4 glass glass-border rounded-xl hover:bg-secondary/30 transition-all group"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">GitHub</span>
              </a>
            </div>

            {/* Certifications */}
            <div className="p-6 glass glass-border rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="p-6 glass glass-border rounded-xl space-y-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-experience" />
                <h3 className="font-semibold">Achievements</h3>
              </div>

              {achievementGroups.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <div key={group.heading} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <GroupIcon className="w-4 h-4 text-muted-foreground" />
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {group.heading}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const c = colorMap[item.color];
                        return (
                          <li
                            key={item.title}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${c.border} ${c.bg} hover:bg-secondary/30 transition-colors`}
                          >
                            <div className={`p-1.5 rounded-md ${c.bg} ${c.text} flex-shrink-0 mt-0.5`}>
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm font-semibold ${c.text}`}>{item.title}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                                {item.detail}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="p-8 glass glass-border rounded-2xl space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  required
                  className="bg-secondary/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="bg-secondary/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  required
                  className="bg-secondary/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  required
                  className="bg-secondary/50 border-border focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-primary text-primary-foreground font-semibold glow-primary hover:glow-strong transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
