import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "Building AI-Powered Threat Detection Systems",
    excerpt: "Learn how to leverage Hugging Face Transformers and machine learning to create intelligent security systems that detect anomalies in network traffic.",
    date: "Jan 10, 2025",
    readTime: "8 min read",
    category: "Cybersecurity",
    color: "primary",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
  },
  {
    title: "Deep Dive into LSTM Networks for Time Series Prediction",
    excerpt: "A comprehensive guide to building LSTM neural networks for predicting sequential data, with practical examples from sports analytics.",
    date: "Dec 15, 2024",
    readTime: "12 min read",
    category: "Machine Learning",
    color: "experience",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    title: "Securing Web Applications: A Developer's Guide to OWASP Top 10",
    excerpt: "Essential security practices every developer should know to protect web applications from common vulnerabilities and attacks.",
    date: "Nov 28, 2024",
    readTime: "10 min read",
    category: "Security",
    color: "skill",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  },
  {
    title: "Text-to-Image Generation with Stable Diffusion",
    excerpt: "Step-by-step tutorial on building a production-ready generative AI application using PyTorch and Stable Diffusion models.",
    date: "Oct 20, 2024",
    readTime: "15 min read",
    category: "Generative AI",
    color: "project",
    image: "https://images.unsplash.com/photo-1686191128892-3b37add4bc4e?w=600&h=400&fit=crop",
  },
];

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="blog" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

        {/* Featured post */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group relative overflow-hidden rounded-2xl glass glass-border hover:shadow-elevated transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getColorClass(blogPosts[0].color).badge}`}>
                    {blogPosts[0].category}
                  </span>
                  <span className="text-xs text-muted-foreground">Featured</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {blogPosts[0].excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </span>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-fit gap-2 text-primary hover:text-primary hover:bg-primary/10 group/btn"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, index) => {
            const colorClasses = getColorClass(post.color);

            return (
              <article
                key={post.title}
                className={`group glass glass-border rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${colorClasses.badge}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

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
              </article>
            );
          })}
        </div>

        {/* View all button */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            variant="outline" 
            size="lg"
            className="gap-2 border-border hover:bg-secondary/50"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
