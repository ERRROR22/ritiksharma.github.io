import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./animations/ScrollReveal";

const certifications = [
  "Generative AI (Simplilearn)",
  "Python for Data Science",
  "TCS iON Career Edge",
];

const extracurriculars = [
  "Participant – Bharat Budget Quest Quiz",
  "Technical Workshops & Coding Events",
];

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

            {/* Extracurricular Activities */}
            <div className="p-6 glass glass-border rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-experience" />
                <h3 className="font-semibold">Extracurricular Activities</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {extracurriculars.map((activity) => (
                  <span
                    key={activity}
                    className="px-3 py-1.5 text-sm bg-experience/10 text-experience rounded-lg"
                  >
                    {activity}
                  </span>
                ))}
              </div>
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
