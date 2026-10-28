"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, FileText, FolderKanban, Mail, PenLine, Plus, Users } from "lucide-react";
import { PageHeader, useAdmin } from "@/components/admin/shell";
import { api } from "@/lib/admin-api";

interface Stats {
  published: number;
  drafts: number;
  views: number;
  subscribers: number;
  unread: number;
  projects: number;
  topPosts: { id: string; title: string; slug: string; views: number }[];
}

export default function Dashboard() {
  const admin = useAdmin();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api<Stats>("/admin/stats").then(setStats).catch(() => {});
  }, []);

  const cards = [
    { label: "Articles publiés", value: stats?.published, icon: FileText, href: "/admin/posts" },
    { label: "Brouillons", value: stats?.drafts, icon: PenLine, href: "/admin/posts" },
    { label: "Vues totales", value: stats?.views, icon: Eye, href: "/admin/posts" },
    { label: "Abonnés", value: stats?.subscribers, icon: Users, href: "/admin/subscribers" },
    { label: "Messages non lus", value: stats?.unread, icon: Mail, href: "/admin/messages" },
    { label: "Projets", value: stats?.projects, icon: FolderKanban, href: "/admin/projects" },
  ];

  return (
    <>
      <PageHeader
        title={`Bonjour ${admin?.name.split(" ")[0] ?? ""} 👋`}
        description="Vue d'ensemble du blog et du portfolio."
        actions={
          <Link href="/admin/posts/edit" className="btn-primary">
            <Plus className="size-4" /> Nouvel article
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="card p-5 transition hover:border-primary/40">
            <Icon className="size-4 text-muted" />
            <p className="mt-4 text-3xl font-semibold tracking-tight">{value ?? "—"}</p>
            <p className="text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>
      <div className="card mt-6 p-5">
        <p className="font-medium">Articles les plus lus</p>
        {stats?.topPosts.length ? (
          <ol className="mt-4 divide-y">
            {stats.topPosts.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="w-5 font-mono text-muted">{i + 1}</span>
                <Link href={`/admin/posts/edit?id=${p.id}`} className="flex-1 truncate hover:text-primary">
                  {p.title}
                </Link>
                <span className="flex items-center gap-1 text-muted">
                  <Eye className="size-3.5" /> {p.views}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-2 text-sm text-muted">Publiez votre premier article pour voir les statistiques ici.</p>
        )}
      </div>
    </>
  );
}
