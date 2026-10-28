"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Calendar, MapPin, Trophy, Users } from "lucide-react";
import type { EventItem, EventType } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: { id: EventType | "ALL"; label: string }[] = [
  { id: "ALL", label: "Tous" },
  { id: "HACKATHON", label: "Hackathons" },
  { id: "CONFERENCE", label: "Conférences" },
  { id: "COMPETITION", label: "Compétitions" },
];

const typeLabel: Record<EventType, string> = { HACKATHON: "Hackathon", CONFERENCE: "Conférence", COMPETITION: "Compétition" };

export function EventsList({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState<EventType | "ALL">("ALL");
  const list = active === "ALL" ? events : events.filter((e) => e.type === active);

  return (
    <>
      <div role="tablist" className="mb-10 inline-flex flex-wrap gap-1 rounded-full border bg-surface p-1">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={active === f.id}
            onClick={() => setActive(f.id)}
            className={cn("rounded-full px-4 py-1.5 text-sm transition", active === f.id ? "bg-foreground text-background" : "text-muted hover:text-foreground")}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((e) => (
          <article key={e.id} className="card flex flex-col overflow-hidden">
            <div className="relative aspect-[16/9] border-b bg-surface-2">
              {e.image && <Image src={e.image} alt={e.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />}
              <span className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur">{typeLabel[e.type]}</span>
              {(e.isWinner || e.position) && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  <Trophy className="size-3.5" /> {e.position || "Lauréat"}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" /> {e.date}
                </span>
                {e.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" /> {e.location}
                  </span>
                )}
                {e.teamSize && (
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-3.5" /> Équipe de {e.teamSize}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{e.title}</h2>
              {e.project && <p className="mt-1 text-sm font-medium text-primary">Projet : {e.project}</p>}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{e.description}</p>
              {e.tech.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {e.url && (
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 self-start !px-4 !py-2">
                  Voir le projet <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
