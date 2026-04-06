import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LazySection factory={() => import("@/components/AboutMe")} />
      <LazySection factory={() => import("@/components/Summary")} />
      <LazySection factory={() => import("@/components/Skills")} />
      <LazySection factory={() => import("@/components/Education")} />
      <LazySection factory={() => import("@/components/Experience")} />
      <LazySection factory={() => import("@/components/Projects")} />
      <LazySection factory={() => import("@/components/Certifications")} />
      <LazySection factory={() => import("@/components/Blog")} />
      <LazySection factory={() => import("@/components/Contact")} />
      <LazySection factory={() => import("@/components/Footer")} />
    </div>
  );
};

export default Index;
