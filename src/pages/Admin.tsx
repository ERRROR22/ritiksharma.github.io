import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { applyPageMeta } from "@/lib/pageMeta";
import { formatPostDate, type CmsPost } from "@/hooks/usePosts";
import { Loader2, LogOut, Plus, Trash2, Eye, EyeOff, Mail, FileText } from "lucide-react";

const CATEGORIES = ["AI/ML", "Cybersecurity", "Full-Stack", "Career", "Cloud", "General"];
const COLORS = ["primary", "experience", "project", "skill"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

const readTimeFor = (content: string) =>
  `${Math.max(1, Math.round(content.trim().split(/\s+/).filter(Boolean).length / 200))} min read`;

type Draft = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  color: string;
  image: string;
  published: boolean;
};

const emptyDraft: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "AI/ML",
  color: "primary",
  image: "",
  published: false,
};

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"posts" | "messages">("posts");

  useEffect(() => {
    const restore = applyPageMeta({
      title: "Admin | Ritik Sharma Portfolio",
      description: "Private publishing area.",
      path: "/admin",
      noindex: true,
    });
    return restore;
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id;

  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["is-admin", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["admin-posts", userId],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as CmsPost[];
    },
  });

  const { data: messages } = useQuery({
    queryKey: ["admin-messages", userId],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const derivedSlug = useMemo(
    () => draft.slug || slugify(draft.title),
    [draft.slug, draft.title],
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSigningIn(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      return;
    }
    setPassword("");
  };

  const resetDraft = () => setDraft(emptyDraft);

  const savePost = async (publish: boolean) => {
    if (!draft.title.trim() || !draft.content.trim()) {
      toast({
        title: "Missing content",
        description: "A title and the article body are required.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const payload = {
      slug: derivedSlug,
      title: draft.title.trim(),
      excerpt: draft.excerpt.trim() || `${draft.content.trim().slice(0, 155)}…`,
      content: draft.content,
      category: draft.category,
      color: draft.color,
      image: draft.image.trim(),
      read_time: readTimeFor(draft.content),
      published: publish,
      author_id: userId,
    };

    const { error } = draft.id
      ? await supabase.from("posts").update(payload).eq("id", draft.id)
      : await supabase.from("posts").insert(payload);

    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: publish ? "Published" : "Draft saved",
      description: publish ? "The article is live on your blog." : "Saved without publishing.",
    });
    resetDraft();
    queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    queryClient.invalidateQueries({ queryKey: ["posts", "published"] });
  };

  const togglePublished = async (post: CmsPost) => {
    const { error } = await supabase
      .from("posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    if (error) {
      toast({ title: "Could not update", description: error.message, variant: "destructive" });
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    queryClient.invalidateQueries({ queryKey: ["posts", "published"] });
  };

  const deletePost = async (post: CmsPost) => {
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) {
      toast({ title: "Could not delete", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: `“${post.title}” was removed.` });
    queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    queryClient.invalidateQueries({ queryKey: ["posts", "published"] });
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <form
          onSubmit={handleSignIn}
          className="w-full max-w-sm p-8 glass glass-border rounded-2xl space-y-5"
        >
          <div>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Private area for writing and publishing articles.
            </p>
          </div>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <Button type="submit" className="w-full" disabled={signingIn}>
            {signingIn ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    );
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">No access</h1>
          <p className="text-muted-foreground">
            This account ({session.user.email}) is signed in but is not allowed to publish.
          </p>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Publishing</h1>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={tab === "posts" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("posts")}
            >
              <FileText className="w-4 h-4 mr-2" /> Articles
            </Button>
            <Button
              variant={tab === "messages" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("messages")}
            >
              <Mail className="w-4 h-4 mr-2" /> Messages
            </Button>
            <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10">
        {tab === "posts" ? (
          <>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {draft.id ? "Edit article" : "New article"}
              </h2>
              <Input
                placeholder="Title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
              <p className="text-xs text-muted-foreground font-mono">/blog/{derivedSlug || "…"}</p>
              <Textarea
                placeholder="Short summary shown in search results and previews (max ~155 characters)"
                rows={3}
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              />
              <Input
                placeholder="Cover image URL (optional)"
                value={draft.image}
                onChange={(e) => setDraft({ ...draft, image: e.target.value })}
              />
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setDraft({ ...draft, category: c })}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      draft.category === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "glass glass-border text-muted-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setDraft({ ...draft, color: c })}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      draft.color === c
                        ? "bg-secondary border-primary"
                        : "glass glass-border text-muted-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Textarea
                placeholder={"Write your article here. Markdown works:\n\n## A heading\n\nA paragraph."}
                rows={16}
                className="font-mono text-sm"
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Estimated reading time: {readTimeFor(draft.content)}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => savePost(true)} disabled={saving}>
                  {saving ? "Saving…" : "Publish"}
                </Button>
                <Button variant="outline" onClick={() => savePost(false)} disabled={saving}>
                  Save as draft
                </Button>
                {draft.id && (
                  <Button variant="ghost" onClick={resetDraft}>
                    Cancel
                  </Button>
                )}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Your articles</h2>
              {postsLoading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
              {posts?.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing here yet — your first article will show up in this list.
                </p>
              )}
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="p-4 glass glass-border rounded-xl flex items-start justify-between gap-4"
                >
                  <button
                    className="text-left min-w-0"
                    onClick={() =>
                      setDraft({
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        excerpt: post.excerpt,
                        content: post.content,
                        category: post.category,
                        color: post.color,
                        image: post.image,
                        published: post.published,
                      })
                    }
                  >
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPostDate(post.published_at)} ·{" "}
                      {post.published ? "Live" : "Draft"}
                    </p>
                  </button>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => togglePublished(post)}>
                      {post.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deletePost(post)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <section className="lg:col-span-2 space-y-3">
            <h2 className="text-lg font-semibold">Contact messages</h2>
            {messages?.length === 0 && (
              <p className="text-sm text-muted-foreground">No messages yet.</p>
            )}
            {messages?.map((m) => (
              <div key={m.id} className="p-4 glass glass-border rounded-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{m.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPostDate(m.created_at)} · {m.email_sent ? "Emailed" : "Not emailed"}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {m.name} — <a className="underline" href={`mailto:${m.email}`}>{m.email}</a>
                </p>
                <p className="text-sm whitespace-pre-wrap">{m.message}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;
