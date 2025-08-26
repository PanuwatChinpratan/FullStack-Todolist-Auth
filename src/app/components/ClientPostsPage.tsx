"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  RefreshCw,
  Star,
  Clock,
  Filter,
  Plus,
  Laptop,
  TerminalSquare,
  Link as LinkIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type PostItem = {
  id: string;
  title: string;
  content: string;
  description?: string | null;
  tags: string[];
  lang?: string | null;
  url?: string | null;
  stars?: number | null;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
};

function formatTimeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function parseTagsInput(v: string): string[] {
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ClientPostsPage({
  userEmail,
  canPost,
}: {
  userEmail: string | null;
  canPost: boolean;
}) {
  // UI state
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [tab, setTab] = useState("all");
  const [mounted, setMounted] = useState(false);

  // dialog state
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // form state
  const [fTitle, setFTitle] = useState("");
  const [fContent, setFContent] = useState("");
  const [fDescription, setFDescription] = useState("");
  const [fTags, setFTags] = useState("");
  const [fLang, setFLang] = useState("");
  const [fUrl, setFUrl] = useState("");
  const [fStars, setFStars] = useState<number | "">("");

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isSlash = e.key === "/" || e.key === "?" || e.code === "Slash";
      if (!isSlash) return;

      const el = e.target as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" || tag === "textarea" || el?.isContentEditable;

      if (!isTyping && !open) {
        e.preventDefault();
        e.stopPropagation();

        setTimeout(() => {
          const input = searchRef.current;
          if (input) {
            input.focus({ preventScroll: true });
          }
        }, 0);
      }
    };

    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open]);

  useEffect(() => setMounted(true), []);

  const queryClient = useQueryClient();

  const postsQuery = useQuery<PostItem[]>({
    queryKey: ["posts", { q: query, selected, tab }],
    queryFn: async () => {
      const res = await fetch("/api/posts", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      description?: string;
      tags?: string[];
      lang?: string;
      url?: string;
      stars?: number;
    }) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err?.error ? JSON.stringify(err.error) : "Create failed"
        );
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Post created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setOpen(false);
    },
    onError: (e: any) => {
      toast.error(typeof e?.message === "string" ? e.message : "Create failed");
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: async (payload: {
      id: string;
      data: {
        title?: string;
        content?: string;
        description?: string;
        tags?: string[];
        lang?: string;
        url?: string;
        stars?: number;
      };
    }) => {
      const res = await fetch(`/api/posts/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err?.error ? JSON.stringify(err.error) : "Update failed"
        );
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Post updated");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setOpen(false);
    },
    onError: (e: any) => {
      toast.error(typeof e?.message === "string" ? e.message : "Update failed");
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err?.error ? JSON.stringify(err.error) : "Delete failed"
        );
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (e: any) => {
      toast.error(typeof e?.message === "string" ? e.message : "Delete failed");
    },
  });

  const items = postsQuery.data ?? [];

  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => p.tags?.forEach?.((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) =>
        selected.length ? selected.every((t) => i.tags.includes(t)) : true
      )
      .filter((i) =>
        q
          ? [
              i.title.toLowerCase(),
              (i.description || "").toLowerCase(),
              i.content.toLowerCase(),
              i.tags.join(" ").toLowerCase(),
            ].some((s) => s.includes(q))
          : true
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }, [items, query, selected]);

  const toggleTag = (t: string) =>
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  const clearAll = () => setSelected([]);

  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  // --- Dialog helpers ---
  function openCreateDialog() {
    setEditId(null);
    setFTitle("");
    setFContent("");
    setFDescription("");
    setFTags("");
    setFLang("");
    setFUrl("");
    setFStars("");
    setOpen(true);
  }

  function openEditDialog(p: PostItem) {
    setEditId(p.id);
    setFTitle(p.title);
    setFContent(p.content);
    setFDescription(p.description ?? "");
    setFTags(p.tags.join(","));
    setFLang(p.lang ?? "");
    setFUrl(p.url ?? "");
    setFStars(typeof p.stars === "number" ? p.stars : "");
    setOpen(true);
  }

  function submitDialog() {
    const payload = {
      title: fTitle.trim(),
      content: fContent.trim(),
      description: fDescription.trim() || undefined,
      tags: parseTagsInput(fTags),
      lang: fLang.trim() || undefined,
      url: fUrl.trim() || undefined,
      stars: fStars === "" ? undefined : Number(fStars),
    };

    if (!payload.title || !payload.content) {
      toast.error("Title & Content are required");
      return;
    }

    if (editId) {
      updateMutation.mutate({ id: editId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  const addQuickPost = () => openCreateDialog();

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Posts (Blog)</h1>
            <p className="text-muted-foreground">
              TanStack Query + API จริง (Mongo Prisma){" "}
              {userEmail ? (
                <>Signed in as {userEmail}</>
              ) : (
                <span className="text-white">Guest</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" disabled className="gap-2">
              <RefreshCw className="h-4 w-4" /> Live (SSE) — off
            </Button>
            {canPost && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={addQuickPost}
              >
                <Plus className="h-4 w-4" /> New Post
              </Button>
            )}
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <div className="flex-1">
                <Input
                  ref={searchRef}
                  placeholder="Search by title, tag, or content…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />{" "}
                {selected.length
                  ? `${selected.length} filter(s)`
                  : "No filters"}
                {selected.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={clearAll}>
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge
                  key={t}
                  onClick={() => toggleTag(t)}
                  variant={selected.includes(t) ? "default" : "outline"}
                  className="cursor-pointer select-none"
                >
                  {t}
                </Badge>
              ))}
              {tags.length === 0 && (
                <span className="text-sm text-muted-foreground">
                  No tags yet
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs value={tab} onValueChange={setTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="all" className="cursor-pointer">
              All
            </TabsTrigger>
            <TabsTrigger value="ts" className="cursor-pointer">
              TypeScript
            </TabsTrigger>
            <TabsTrigger value="server" className="cursor-pointer">
              Server
            </TabsTrigger>
            <TabsTrigger value="next" className="cursor-pointer">
              Next.js
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-4">
          {filtered
            .filter((i) =>
              tab === "all"
                ? true
                : tab === "ts"
                ? ["ts", "tsx"].includes((i.lang || "").toLowerCase())
                : tab === "server"
                ? i.tags.includes("server")
                : tab === "next"
                ? i.tags.includes("next.js")
                : true
            )
            .map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <Card className="h-full overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base leading-tight">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-xs">
                            <Clock className="h-3 w-3" />{" "}
                            {mounted ? formatTimeAgo(item.updatedAt) : "\u200b"}
                          </span>
                          {typeof item.stars === "number" && (
                            <span className="inline-flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3" /> {item.stars}
                            </span>
                          )}
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs underline decoration-dotted"
                            >
                              <LinkIcon className="h-3 w-3" /> reference
                            </a>
                          )}
                        </CardDescription>
                      </div>
                      {canPost && (
                        <div className="flex items-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => openEditDialog(item)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => deleteMutation.mutate(item.id)}
                                disabled={deleteMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </CardHeader>

                  <Separator />

                  <CardContent className="p-0">
                    <pre className="max-h-56 overflow-auto bg-muted/60 p-4 text-xs leading-relaxed">
                      {item.content}
                    </pre>
                    <div className="flex items-center justify-between gap-2 p-3">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="text-[10px]"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {(() => {
                          const lang = (item.lang || "").toLowerCase();
                          return lang === "ts" || lang === "tsx" ? (
                            <>
                              <Laptop className="h-3.5 w-3.5" /> TS/TSX
                            </>
                          ) : lang ? (
                            <>
                              <TerminalSquare className="h-3.5 w-3.5" />{" "}
                              {lang.toUpperCase()}
                            </>
                          ) : (
                            <>
                              <TerminalSquare className="h-3.5 w-3.5" /> POST
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-sm text-muted-foreground">
            No results. Try different keywords or clear filters.
          </div>
        )}

        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <div>
            <span className="font-medium text-foreground">Tips</span>: Press{" "}
            <kbd className="rounded border px-1">/</kbd> to focus search. Click
            badges to filter.
          </div>
        </footer>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Post" : "New Post"}</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลโพสต์ด้านล่าง แล้วกด Save
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={fTitle}
                onChange={(e) => setFTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                rows={6}
                value={fContent}
                onChange={(e) => setFContent(e.target.value)}
              />
            </div>

            {/* ถ้า schema ไม่มี description ให้ลบ block นี้ */}
            <div className="grid gap-1.5">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                value={fDescription}
                onChange={(e) => setFDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="next.js, server, ts"
                value={fTags}
                onChange={(e) => setFTags(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="lang">Lang</Label>
                <Input
                  id="lang"
                  placeholder="ts / tsx / js / ..."
                  value={fLang}
                  onChange={(e) => setFLang(e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="stars">Stars</Label>
                <Input
                  id="stars"
                  type="number"
                  value={fStars}
                  onChange={(e) =>
                    setFStars(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="url">Reference URL</Label>
              <Input
                id="url"
                value={fUrl}
                onChange={(e) => setFUrl(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={submitDialog}
              disabled={
                createMutation.isPending || updateMutation.isPending || !canPost
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
