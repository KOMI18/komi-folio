"use client";

import Image from "next/image";
import { useState } from "react";
import type { Skill, SkillCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: { id: SkillCategory | "ALL"; label: string }[] = [
  { id: "ALL", label: "Tout" },
  { id: "FRONTEND", label: "Front & mobile" },
  { id: "BACKEND", label: "Backend & data" },
  { id: "TOOLS", label: "Outils & DevOps" },
];

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState<SkillCategory | "ALL">("ALL");
  const list = active === "ALL" ? skills : skills.filter((s) => s.category === active);

  return (
    <div>
      <div role="tablist" className="mb-8 inline-flex flex-wrap gap-1 rounded-full border bg-surface p-1">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition",
              active === c.id ? "bg-foreground text-background" : "text-muted hover:text-foreground",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <li key={s.id} className="card flex items-start gap-4 p-5 transition hover:border-primary/40">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border bg-white">
              {s.icon ? (
                <Image src={s.icon} alt="" width={24} height={24} className="size-6 object-contain" unoptimized />
              ) : (
                <span className="font-semibold">{s.name[0]}</span>
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{s.name}</p>
                {s.mastery && <span className="chip shrink-0">{s.mastery}</span>}
              </div>
              {s.description && <p className="mt-1 text-sm text-muted">{s.description}</p>}
              {s.experience && <p className="mt-2 font-mono text-xs text-muted">{s.experience}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
