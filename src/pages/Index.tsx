import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LazySection factory={() => import("@/components/AboutMe")} />
      <section id="now" className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <LazySection factory={() => import("@/components/NowStatus")} />
        </div>
      </section>
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
