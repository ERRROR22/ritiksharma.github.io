import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";

const roles = [
  "Cybersecurity Specialist",
  "Machine Learning Engineer",
  "Full-Stack Developer",
  "AI Enthusiast",
];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-project/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-experience/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className={`relative z-10 container mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass glass-border rounded-full">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-foreground">Ritik</span>{" "}
          <span className="text-gradient">Sharma</span>
        </h1>

        {/* Animated roles */}
        <div className="h-12 md:h-14 mb-8 overflow-hidden">
          <p 
            key={currentRole}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium animate-fade-up"
          >
            {roles[currentRole]}
          </p>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed">
          B.Tech CSE student at BGSBU crafting intelligent solutions at the intersection of{" "}
          <span className="text-primary">Cybersecurity</span>,{" "}
          <span className="text-project">Machine Learning</span>, and{" "}
          <span className="text-experience">Full-Stack Development</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground font-semibold px-8 glow-primary hover:glow-strong transition-all duration-300"
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-border hover:bg-secondary/50 transition-all duration-300"
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </Button>
          <a href="/Ritik_Sharma_Resume.pdf" download>
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2 border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://www.linkedin.com/in/ritik-sharma-323a2724a" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass glass-border rounded-xl hover:bg-secondary/50 transition-all duration-300 hover:scale-110 group"
          >
            <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          <a 
            href="https://github.com/ERRROR22" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 glass glass-border rounded-xl hover:bg-secondary/50 transition-all duration-300 hover:scale-110 group"
          >
            <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          <a 
            href="mailto:ritiksharma4451@gmail.com"
            className="p-3 glass glass-border rounded-xl hover:bg-secondary/50 transition-all duration-300 hover:scale-110 group"
          >
            <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={() => scrollToSection('skills')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
