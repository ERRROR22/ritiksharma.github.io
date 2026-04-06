import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const AboutMe = lazy(() => import("@/components/AboutMe"));
const Summary = lazy(() => import("@/components/Summary"));
const Skills = lazy(() => import("@/components/Skills"));
const Education = lazy(() => import("@/components/Education"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Certifications = lazy(() => import("@/components/Certifications"));
const Blog = lazy(() => import("@/components/Blog"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <AboutMe />
        <Summary />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Certifications />
        <Blog />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
