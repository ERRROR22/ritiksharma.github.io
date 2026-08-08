import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Search, Home, ArrowRight, Compass, FileQuestion } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { applyPageMeta } from "@/lib/pageMeta";


const SECTIONS = [
  { id: "about", label: "About Me", hint: "Background, interests, cricket" },
  { id: "summary", label: "Professional Summary", hint: "Profile overview" },
  { id: "skills", label: "Technical Expertise", hint: "Frontend, backend, AI/ML tools" },
  { id: "education", label: "Education", hint: "Degree, CGPA, coursework" },
  { id: "experience", label: "Experience", hint: "Internships and highlights" },
  { id: "projects", label: "Projects", hint: "NewsVerify, WAFinity, IPL ML" },
  { id: "certifications", label: "Certifications", hint: "IBM, Anthropic, Great Learning" },
  { id: "blog", label: "Articles", hint: "Latest writing" },
  { id: "contact", label: "Contact", hint: "Email, socials, achievements" },
];

/** Cheap token-overlap score so misspelled or partial URLs still match. */
const score = (haystack: string, needle: string) => {
  const h = haystack.toLowerCase();
  const tokens = needle.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  if (!tokens.length) return 0;
  return tokens.reduce((acc, t) => acc + (h.includes(t) ? t.length : 0), 0);
};

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  // Seed the search with words pulled from the broken URL.
  const urlWords = useMemo(
    () => location.pathname.replace(/[/_-]+/g, " ").trim(),
    [location.pathname]
  );

  const term = query.trim() || urlWords;

  const postMatches = useMemo(() => {
    const ranked = blogPosts
      .map((p) => ({
        post: p,
        s: score(`${p.title} ${p.excerpt} ${p.category} ${p.slug}`, term),
      }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 5)
      .map((r) => r.post);
    return ranked.length ? ranked : blogPosts.slice(0, 3);
  }, [term]);

  const sectionMatches = useMemo(() => {
    const ranked = SECTIONS.map((s) => ({ s, v: score(`${s.label} ${s.hint} ${s.id}`, term) }))
      .filter((r) => r.v > 0)
      .sort((a, b) => b.v - a.v)
      .map((r) => r.s);
    return ranked.length ? ranked : SECTIONS;
  }, [term]);

  const goToSection = (id: string) => {
    navigate("/");
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    });
  };

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <FileQuestion className="h-3.5 w-3.5" />
            404 — page not found
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            That page moved, or never existed
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{location.pathname}</code> isn't
            here — but here are the closest articles and sections.
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles and sections…"
            aria-label="Search articles and sections"
            className="pl-9"
          />
        </div>

        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Compass className="h-4 w-4" /> Suggested articles
          </h2>
          <ul className="space-y-2">
            {postMatches.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/50 hover:bg-card"
                >
                  <span>
                    <span className="block text-sm font-medium group-hover:text-primary">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground line-clamp-2">
                      {p.excerpt}
                    </span>
                    <span className="mt-2 block text-[11px] uppercase tracking-wide text-muted-foreground">
                      {p.category} · {p.readTime}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Jump to a section
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sectionMatches.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="rounded-lg border border-border bg-card/50 p-3 text-left transition-colors hover:border-primary/50 hover:bg-card"
              >
                <span className="block text-sm font-medium">{s.label}</span>
                <span className="block text-xs text-muted-foreground">{s.hint}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Back to home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
