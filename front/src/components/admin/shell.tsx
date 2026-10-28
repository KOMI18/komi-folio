"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Briefcase,
  CalendarDays,
  ExternalLink,
  FileText,
  FolderKanban,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { api } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../site/theme-toggle";
import { Toaster } from "./toast";

interface Admin {
  id: string;
  email: string;
  name: string;
}

const AdminContext = createContext<Admin | null>(null);
export const useAdmin = () => useContext(AdminContext);

const links = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Articles", icon: FileText },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/experiences", label: "Expériences", icon: Briefcase },
  { href: "/admin/skills", label: "Compétences", icon: Wrench },
  { href: "/admin/education", label: "Formation", icon: GraduationCap },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/media", label: "Médias", icon: ImageIcon },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/subscribers", label: "Abonnés", icon: Users },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api<Admin>("/auth/me")
      .then(setAdmin)
      .catch(() => router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`));
    // Vérification unique au montage du shell
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await api("/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
  };

  if (!admin) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="size-6 animate-spin text-muted" />
      </div>
    );
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <AdminContext.Provider value={admin}>
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-surface transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <span className="grid size-7 place-items-center rounded-full bg-foreground font-serif italic text-background">P</span>
              Admin
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fermer le menu">
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                  isActive(href) ? "bg-surface-2 font-medium text-foreground" : "text-muted hover:bg-surface-2 hover:text-foreground",
                )}
              >
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </nav>
          <div className="space-y-1 border-t p-3">
            <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-foreground">
              <ExternalLink className="size-4" /> Voir le site
            </a>
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <div className="min-w-0 text-xs">
                <p className="truncate font-medium">{admin.name}</p>
                <p className="truncate text-muted">{admin.email}</p>
              </div>
              <div className="flex">
                <ThemeToggle />
                <button onClick={logout} aria-label="Se déconnecter" className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-danger">
                  <LogOut className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>
        {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
            <button onClick={() => setOpen(true)} aria-label="Ouvrir le menu">
              <Menu className="size-5" />
            </button>
            <span className="font-semibold">Admin</span>
          </header>
          <div className="mx-auto max-w-6xl p-4 sm:p-8">{children}</div>
        </div>
      </div>
      <Toaster />
    </AdminContext.Provider>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
