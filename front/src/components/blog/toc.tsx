"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <nav aria-label="Sommaire" className="text-sm">
      <p className="eyebrow mb-4">Sommaire</p>
      <ul className="space-y-2 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l py-0.5 transition",
                h.level === 3 ? "pl-7" : "pl-4",
                active === h.id ? "border-primary text-foreground" : "border-transparent text-muted hover:text-foreground",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
