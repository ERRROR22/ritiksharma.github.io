import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; text: string; badge: string }> = {
      primary: {
        bg: "bg-primary/10",
        text: "text-primary",
        badge: "bg-primary/20 text-primary border-primary/30",
      },
      experience: {
        bg: "bg-experience/10",
        text: "text-experience",
        badge: "bg-experience/20 text-experience border-experience/30",
      },
      project: {
        bg: "bg-project/10",
        text: "text-project",
        badge: "bg-project/20 text-project border-project/30",
      },
      skill: {
        bg: "bg-skill/10",
        text: "text-skill",
        badge: "bg-skill/20 text-skill border-skill/30",
      },
    };
    return colors[color] || colors.primary;
  };

  const featured = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <section id="blog" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-skill glass glass-border rounded-full">
            {"<Blog />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights on cybersecurity, machine learning, and software development
          </p>
        </div>

        {/* Search & Filter */}
        <div className={`mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Search bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-full glass glass-border bg-background/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "glass glass-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className={`block mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="group relative overflow-hidden rounded-2xl glass glass-border hover:shadow-elevated transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getColorClass(featured.color).badge}`}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-muted-foreground">Featured</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="w-fit gap-2 text-primary group-hover:underline flex items-center">
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog grid */}
        {gridPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, index) => {
              const colorClasses = getColorClass(post.color);
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className={`group glass glass-border rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${colorClasses.badge}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
