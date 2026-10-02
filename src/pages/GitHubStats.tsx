import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookMarked,
  GitCommitHorizontal,
  GitFork,
  Github,
  RefreshCw,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { applyPageMeta } from "@/lib/pageMeta";

const GITHUB_USER = "ERRROR22";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}`;

type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  topics: string[];
};

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    size?: number;
    ref_type?: string;
  };
};

type GitHubData = {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  events: GitHubEvent[];
};

const fetchGitHub = async <T,>(path: string): Promise<T> => {
  const response = await fetch(path, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub’s public request limit was reached. Please try again in a few minutes.");
    }
    throw new Error("GitHub activity is temporarily unavailable.");
  }
  return response.json() as Promise<T>;
};

const loadGitHubData = async (): Promise<GitHubData> => {
  const [profile, repos, events] = await Promise.all([
    fetchGitHub<GitHubProfile>(GITHUB_API),
    fetchGitHub<GitHubRepo[]>(`${GITHUB_API}/repos?per_page=100&sort=updated`),
    fetchGitHub<GitHubEvent[]>(`${GITHUB_API}/events/public?per_page=30`),
  ]);
  return { profile, repos, events };
};

const relativeDate = (value: string) => {
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
};

const describeEvent = (event: GitHubEvent) => {
  const repo = event.repo.name.replace(`${GITHUB_USER}/`, "");
  if (event.type === "PushEvent") {
    const count = event.payload.size ?? 0;
    return `Pushed ${count} ${count === 1 ? "commit" : "commits"} to ${repo}`;
  }
  if (event.type === "CreateEvent") return `Created ${event.payload.ref_type ?? "repository content"} in ${repo}`;
  if (event.type === "PullRequestEvent") return `${event.payload.action ?? "Updated"} a pull request in ${repo}`;
  if (event.type === "IssuesEvent") return `${event.payload.action ?? "Updated"} an issue in ${repo}`;
  if (event.type === "WatchEvent") return `Starred ${repo}`;
  if (event.type === "ForkEvent") return `Forked ${repo}`;
  return `Updated ${repo}`;
};

const GitHubStats = () => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["github-public-profile", GITHUB_USER],
    queryFn: loadGitHubData,
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    const restoreMeta = applyPageMeta({
      title: "GitHub Projects & Activity — Ritik Sharma",
      description: "Explore Ritik Sharma's public GitHub repositories, stars, forks, programming languages, and recent open-source activity.",
      path: "/github",
      type: "website",
    });
    const profileSchema = document.createElement("script");
    profileSchema.type = "application/ld+json";
    profileSchema.dataset.githubProfile = GITHUB_USER;
    profileSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: "https://ritiksharma.lovable.app/github",
      mainEntity: {
        "@type": "Person",
        name: "Ritik Sharma",
        url: "https://ritiksharma.lovable.app",
        sameAs: [`https://github.com/${GITHUB_USER}`],
      },
    }).replace(/</g, "\\u003c");
    document.head.appendChild(profileSchema);
    return () => {
      restoreMeta();
      profileSchema.remove();
    };
  }, []);

  const repos = data?.repos ?? [];
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const recentEvents = (data?.events ?? []).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pb-20 pt-28 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-7 -ml-3 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to portfolio
            </Button>
          </Link>

          <header className="mb-10 border-b border-border pb-9">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <div className="mb-4 flex items-center gap-2 font-mono text-sm text-primary">
                  <Github className="h-4 w-4" />
                  github.com/{GITHUB_USER}
                </div>
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">Code in the open.</h1>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Public repositories, community signals, and recent engineering activity—updated directly from GitHub.
                </p>
              </div>
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto">
                  View profile <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </header>

          {isLoading ? (
            <div aria-label="Loading GitHub statistics" className="space-y-8">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[0, 1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse rounded-lg bg-muted" />)}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[0, 1, 2, 3].map((item) => <div key={item} className="h-48 animate-pulse rounded-lg bg-muted" />)}
              </div>
            </div>
          ) : error ? (
            <div className="border border-border bg-card p-8 text-center">
              <Github className="mx-auto mb-4 h-9 w-9 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">Couldn’t load GitHub activity</h2>
              <p className="mb-5 text-muted-foreground">{error instanceof Error ? error.message : "Please try again shortly."}</p>
              <Button onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Try again
              </Button>
            </div>
          ) : data ? (
            <>
              <section aria-label="GitHub totals" className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { label: "Public repos", value: data.profile.public_repos, icon: BookMarked },
                  { label: "Stars earned", value: totalStars, icon: Star },
                  { label: "Forks", value: totalForks, icon: GitFork },
                  { label: "Recent events", value: data.events.length, icon: GitCommitHorizontal },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-lg border border-border bg-card p-5 shadow-card">
                    <Icon className="mb-5 h-5 w-5 text-primary" />
                    <div className="text-3xl font-bold tabular-nums">{value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </section>

              <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
                <section>
                  <div className="mb-5 flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl font-bold">Repositories</h2>
                    <span className="font-mono text-xs text-muted-foreground">Sorted by recent activity</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {repos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-48 flex-col rounded-lg border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-1 hover:border-primary/50"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <h3 className="min-w-0 break-words font-mono text-base font-semibold text-foreground group-hover:text-primary">{repo.name}</h3>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {repo.description || "Public source repository."}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                          {repo.language && <span className="text-foreground">{repo.language}</span>}
                          <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {repo.stargazers_count}</span>
                          <span className="inline-flex items-center gap-1"><GitFork className="h-3.5 w-3.5" /> {repo.forks_count}</span>
                          <span className="ml-auto">{relativeDate(repo.updated_at)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>

                <aside className="lg:sticky lg:top-28">
                  <h2 className="mb-5 text-2xl font-bold">Recent activity</h2>
                  {recentEvents.length > 0 ? (
                    <ol className="border-l border-border pl-5">
                      {recentEvents.map((event) => (
                        <li key={event.id} className="relative pb-6 last:pb-0">
                          <span className="absolute -left-[1.52rem] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                          <p className="break-words text-sm leading-relaxed text-foreground">{describeEvent(event)}</p>
                          <time className="mt-1 block text-xs text-muted-foreground" dateTime={event.created_at}>{relativeDate(event.created_at)}</time>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent public activity to show.</p>
                  )}
                </aside>
              </div>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GitHubStats;