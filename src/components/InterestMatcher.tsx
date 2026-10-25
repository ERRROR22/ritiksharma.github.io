import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Newspaper,
  FolderGit2,
} from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { usePosts } from "@/hooks/usePosts";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";
import {
  buildMatcherCandidates,
  MAX_INTERESTS,
  MIN_INTERESTS,
  resolveMatches,
  type MatcherResponse,
  type MatchedItem,
} from "@/lib/recommendation";

const EXAMPLE_INTERESTS = [
  "AI safety and detecting fake news",
  "web security, firewalls and OWASP",
  "cricket analytics and sports ML",
  "how to start as an AI engineer in 2026",
];

const MatchCard = ({ item, index }: { item: MatchedItem; index: number }) => {
  const Icon = item.kind === "article" ? Newspaper : FolderGit2;
  return (
    <StaggerItem index={index}>
      <div className="glass glass-border rounded-xl p-5 h-full flex flex-col gap-3 border transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border bg-primary/20 text-primary border-primary/30">
            <Icon className="w-3.5 h-3.5" />
            {item.kind === "article" ? "Article" : "Project"}
          </span>
          <span className="text-xs text-muted-foreground truncate">{item.category}</span>
        </div>
        <h4 className="font-semibold leading-snug line-clamp-2">{item.title}</h4>
        <p className="text-sm text-muted-foreground flex-1">
          <span className="text-foreground/80 font-medium">Why it fits: </span>
          {item.reason}
        </p>
        {item.href &&
          (item.href.startsWith("/") ? (
            <Button asChild variant="outline" size="sm" className="self-start group/link">
              <Link to={item.href}>
                {item.linkLabel}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="self-start group/link">
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.linkLabel}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
              </a>
            </Button>
          ))}
      </div>
    </StaggerItem>
  );
};

const InterestMatcher = () => {
  const { data: posts = [] } = usePosts();
  const [interests, setInterests] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const trimmed = interests.trim();
  const isValid = trimmed.length >= MIN_INTERESTS && trimmed.length <= MAX_INTERESTS;

  const mutation = useMutation({
    mutationFn: async (value: string): Promise<MatcherResponse> => {
      const { data, error } = await supabase.functions.invoke(
        "recommend-portfolio-items",
        {
          body: { interests: value, candidates: buildMatcherCandidates(posts) },
        },
      );
      if (error) {
        let message = "Something went wrong. Please try again.";
        if (error instanceof FunctionsHttpError) {
          try {
            const body = await error.json();
            if (body && typeof body.error === "string") message = body.error;
          } catch {
            // keep the default message
          }
        }
        throw new Error(message);
      }
      return data as MatcherResponse;
    },
  });

  const results = useMemo(
    () => (mutation.data ? resolveMatches(mutation.data.matches, posts) : []),
    [mutation.data, posts],
  );

  const handleSubmit = () => {
    if (!isValid || mutation.isPending) return;
    mutation.mutate(trimmed);
  };

  return (
    <section id="matcher" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <ScrollReveal className="text-center mb-10" scale>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-skill glass glass-border rounded-full">
            {"<Matcher />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What are you{" "}
            <span className="text-gradient">interested in?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe what you're curious about and get a shortlist of my projects
            and articles that match — recommended by an AI model reading the
            portfolio catalog.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass glass-border rounded-2xl p-6 md:p-8 space-y-4">
            <label htmlFor="matcher-interests" className="sr-only">
              Your interests
            </label>
            <Textarea
              id="matcher-interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value.slice(0, MAX_INTERESTS))}
              placeholder="e.g. I'm building a misinformation detector and want to learn about LLM evaluation and prompt injection…"
              rows={3}
              className="resize-none bg-background/60"
              maxLength={MAX_INTERESTS}
            />

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">Try:</span>
              {EXAMPLE_INTERESTS.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setInterests(example)}
                  className="text-xs px-3 py-1.5 rounded-full glass glass-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground font-mono">
                {trimmed.length}/{MAX_INTERESTS}
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!isValid || mutation.isPending}
                className="group"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Finding matches…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 transition-transform group-hover:scale-110" />
                    Recommend for me
                  </>
                )}
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {mutation.isError && (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-5 text-center">
            <p className="flex items-center gap-2 text-sm text-destructive-foreground">
              <AlertCircle className="w-4 h-4 shrink-0 text-destructive" />
              {(mutation.error as Error).message}
            </p>
            <Button variant="outline" size="sm" onClick={() => mutation.reset()}>
              <RotateCcw className="w-4 h-4" />
              Dismiss
            </Button>
          </div>
        )}

        {mutation.isPending && !prefersReducedMotion && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass glass-border rounded-xl p-5 space-y-3 animate-pulse"
              >
                <div className="h-5 w-24 rounded-full bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {mutation.data && !mutation.isPending && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10"
          >
            {mutation.data.introduction && (
              <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto italic">
                "{mutation.data.introduction}"
              </p>
            )}
            {results.length > 0 ? (
              <StaggerContainer className="grid gap-4 md:grid-cols-2">
                {results.map((item, index) => (
                  <MatchCard key={`${item.kind}:${item.id}`} item={item} index={index} />
                ))}
              </StaggerContainer>
            ) : (
              <p className="text-center text-muted-foreground">
                No strong matches in my catalog for that — try mentioning a topic
                like AI, security, or cricket analytics.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InterestMatcher;
