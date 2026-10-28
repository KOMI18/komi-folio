"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between rounded-full border px-3 py-2 pl-5 transition-all duration-300",
          scrolled || open
            ? "border-border bg-background/75 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-full bg-foreground font-serif text-base italic text-background">
            P
          </span>
          {site.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm text-muted transition hover:text-foreground",
                isActive(item.href) && "bg-surface-2 text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link href="/#contact" className="btn-primary hidden !py-2 md:inline-flex">
            Me contacter
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-2 max-w-5xl origin-top overflow-hidden rounded-3xl border bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <nav className="grid p-2" aria-label="Navigation mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base transition hover:bg-surface-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
