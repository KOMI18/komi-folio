"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Loader2, Plus, Search, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/shell";
import { toast } from "@/components/admin/toast";
import { api } from "@/lib/admin-api";
import type { Post } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  useEffect(() => {
    api<Post[]>("/admin/posts")
      .then(setPosts)
      .catch((e) => toast(e.message, "error"));
  }, []);

  const list = (posts ?? []).filter(
    (p) => (filter === "ALL" || p.status === filter) && p.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Articles"
        description="Rédigez, publiez et mettez à jour les articles du blog."
        actions={
          <Link href="/admin/posts/edit" className="btn-primary">
            <Plus className="size-4" /> Nouvel article
          </Link>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input className="input pl-9" placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex rounded-full border bg-surface p-1 text-sm">
          {(["ALL", "PUBLISHED", "DRAFT"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full px-3 py-1", filter === f ? "bg-foreground text-background" : "text-muted")}>
              {{ ALL: "Tous", PUBLISHED: "Publiés", DRAFT: "Brouillons" }[f]}
            </button>
          ))}
        </div>
      </div>
      {!posts ? (
        <Loader2 className="mx-auto size-6 animate-spin text-muted" />
      ) : list.length === 0 ? (
        <div className="card p-12 text-center text-muted">Aucun article.</div>
      ) : (
        <ul className="card divide-y">
          {list.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/posts/edit?id=${p.id}`} className="flex items-center gap-4 p-4 transition hover:bg-surface-2/50">
                <span className="relative hidden size-14 shrink-0 overflow-hidden rounded-lg border bg-surface-2 sm:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.coverImage && <img src={p.coverImage} alt="" className="size-full object-cover" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate font-medium">
                    {p.featured && <Star className="size-3.5 shrink-0 fill-primary text-primary" />}
                    {p.title}
                  </p>
                  <p className="truncate text-sm text-muted">
                    {p.status === "PUBLISHED" ? `Publié le ${formatDate(p.publishedAt, { dateStyle: "medium" })}` : `Modifié le ${formatDate(p.updatedAt, { dateStyle: "medium" })}`}
                    {p.tags.length > 0 && ` · ${p.tags.map((t) => `#${t}`).join(" ")}`}
                  </p>
                </div>
                <span className="hidden items-center gap-1 text-sm text-muted sm:flex">
                  <Eye className="size-4" /> {p.views}
                </span>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", p.status === "PUBLISHED" ? "bg-success/15 text-success" : "bg-surface-2 text-muted")}>
                  {p.status === "PUBLISHED" ? "Publié" : "Brouillon"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
