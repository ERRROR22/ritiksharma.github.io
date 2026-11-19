import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { applyPageMeta } from "@/lib/pageMeta";
import { roadmapTasks, type RoadmapStatus } from "@/data/roadmap";

const statusMeta: Record<RoadmapStatus, { label: string; icon: typeof CheckCircle2; className: string }> = {
  done: { label: "Done", icon: CheckCircle2, className: "text-primary border-primary/40 bg-primary/10" },
  "in-progress": { label: "In progress", icon: Loader2, className: "text-skill border-skill/40 bg-skill/10" },
  planned: { label: "Planned", icon: CircleDashed, className: "text-muted-foreground border-border bg-muted" },
};

const order: RoadmapStatus[] = ["in-progress", "planned", "done"];

const RoadmapPage = () => {
  useEffect(
    () =>
      applyPageMeta({
        title: "Roadmap — Ritik Sharma Portfolio",
        description: "See what's done, in progress and planned for Ritik Sharma's portfolio, GitHub stats and blog.",
        path: "/roadmap",
      }),
    [],
  );

  const done = roadmapTasks.filter((t) => t.status === "done").length;
  const pct = Math.round((done / roadmapTasks.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pb-20 pt-28 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <Link to="/github">
            <Button variant="ghost" size="sm" className="mb-7 -ml-3 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to GitHub
            </Button>
          </Link>
          <header className="mb-10 border-b border-border pb-9">
            <p className="mb-3 font-mono text-sm text-primary">/roadmap</p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Roadmap</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">Every task on this site and where it stands.</p>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                <span>{done} of {roadmapTasks.length} done</span>
                <span className="font-mono">{pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </header>
          {order.map((status) => {
            const tasks = roadmapTasks.filter((t) => t.status === status);
            if (!tasks.length) return null;
            const meta = statusMeta[status];
            return (
              <section key={status} className="mb-10">
                <h2 className="mb-4 text-xl font-bold">{meta.label} <span className="text-muted-foreground font-normal">({tasks.length})</span></h2>
                <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                  {tasks.map((task) => {
                    const Icon = meta.icon;
                    return (
                      <li key={task.title} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${meta.className.split(" ")[0]}`} />
                          <div className="min-w-0">
                            <p className={`break-words ${status === "done" ? "text-muted-foreground line-through decoration-primary/40" : "text-foreground"}`}>{task.title}</p>
                            <p className="mt-1 font-mono text-xs text-muted-foreground">{task.area}</p>
                          </div>
                        </div>
                        <span className={`w-fit shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.className}`}>{meta.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
