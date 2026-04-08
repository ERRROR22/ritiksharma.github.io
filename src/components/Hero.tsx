import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import ritikPhoto from "@/assets/ritik-photo.jpeg";

const roles = [
  "Software Engineer",
  "AI-ML Engineer",
  "Cybersecurity Analyst",
  "Full-Stack Developer",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
          return;
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(role.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-project/5 rounded-full blur-3xl"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-experience/5 rounded-full blur-3xl"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div className="mb-6 mt-20 md:mt-12" variants={itemVariants}>
          <motion.div 
            className="relative inline-block cursor-pointer"
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-primary/30 ring-offset-4 ring-offset-background mx-auto shadow-[0_0_30px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-shadow duration-500">
              <img 
                src={ritikPhoto} 
                alt="Ritik Sharma" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-background animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Status badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass glass-border rounded-full"
          variants={itemVariants}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          variants={itemVariants}
        >
          <span className="text-foreground">Ritik</span>{" "}
          <span className="text-gradient">Sharma</span>
        </motion.h1>

        {/* Animated roles - typing effect */}
        <motion.div 
          className="h-12 md:h-14 mb-8 flex items-center justify-center"
          variants={itemVariants}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
            {displayText}
            <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-[blink_1s_step-end_infinite] align-middle" />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed"
          variants={itemVariants}
        >
          Final-year CSE student at BGSBU with hands-on experience in{" "}
          <span className="text-primary">AI & Machine Learning</span>,{" "}
          <span className="text-project">Cybersecurity</span>, and{" "}
          <span className="text-experience">Software Development</span>. Seeking entry-level roles as a Software Engineer / AI-ML Engineer / Cybersecurity Analyst.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground font-semibold px-8 glow-primary hover:glow-strong transition-all duration-300"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:bg-secondary/50 transition-all duration-300"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          {[
            { href: "https://www.linkedin.com/in/ritik-sharma-323a2724a", icon: Linkedin },
            { href: "https://github.com/ERRROR22", icon: Github },
            { href: "mailto:ritiksharma4451@gmail.com", icon: Mail },
          ].map((social, index) => (
            <motion.a 
              key={index}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="p-3 glass glass-border rounded-xl hover:bg-secondary/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button 
          onClick={() => scrollToSection('skills')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5 },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
