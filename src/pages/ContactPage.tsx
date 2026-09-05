import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { applyPageMeta } from "@/lib/pageMeta";

const ContactPage = () => {
  useEffect(() => {
    const restore = applyPageMeta({
      title: "Contact | Ritik Sharma Portfolio",
      description:
        "Get in touch with Ritik Sharma — AI/ML engineer, cybersecurity enthusiast, and full-stack developer. Email, LinkedIn, GitHub, and contact form.",
      path: "/contact",
    });
    return restore;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
