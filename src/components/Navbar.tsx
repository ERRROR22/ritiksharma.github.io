import { useState, useEffect } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import resumeAsset from "@/assets/RitikResumeUpdated.pdf.asset.json";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass glass-border py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            <span className="text-gradient">RS</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            <ThemeSwitcher />
            
            <a
              href={resumeAsset.url}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Button
                size="sm"
                variant="outline"
                className="border-border hover:bg-secondary/50 font-semibold"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </a>
            
            <Button 
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-primary text-primary-foreground font-semibold"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeSwitcher />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 pt-4 animate-fade-in glass glass-border rounded-xl mx-[-8px] px-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button 
                size="sm"
                onClick={() => scrollToSection("#contact")}
                className="bg-gradient-primary text-primary-foreground font-semibold w-fit"
              >
                Hire Me
              </Button>
              <a
                href={resumeAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-fit"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border hover:bg-secondary/50 font-semibold"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
