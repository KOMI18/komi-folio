import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Experience } from "@/lib/types";
import { formatPeriod } from "@/lib/utils";
import { Reveal } from "../site/reveal";
import { SectionHeading } from "../site/section-heading";

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) return null;
  return (
    <section id="experience" className="py-24">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Parcours <span className="accent">professionnel</span>
            </>
          }
          intro="Des missions concrètes, des résultats mesurables et des collaborations avec des équipes ambitieuses."
        />
        <ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[27px] before:w-px before:bg-border md:before:left-[31px]">
          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.id} delay={i * 60} className="relative flex gap-5 md:gap-7">
              <span
                className="relative z-10 grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-background bg-surface md:size-16"
                style={{ boxShadow: `0 0 0 1px ${exp.color}40` }}
              >
                {exp.logo ? (
                  <Image src={exp.logo} alt={exp.company} width={64} height={64} className="size-full object-cover" />
                ) : (
                  <span className="font-semibold" style={{ color: exp.color }}>
                    {exp.company.slice(0, 2)}
                  </span>
                )}
              </span>
              <article className="card flex-1 p-6 transition hover:border-[color:var(--c)]" style={{ "--c": `${exp.color}80` } as React.CSSProperties}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm">
                      {exp.link ? (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:underline" style={{ color: exp.color }}>
                          {exp.company} <ArrowUpRight className="size-3.5" />
                        </a>
                      ) : (
                        <span className="font-medium" style={{ color: exp.color }}>
                          {exp.company}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted">
                    <p className="font-mono">{formatPeriod(exp.startDate, exp.endDate)}</p>
                    {!exp.endDate && (
                      <p className="mt-1 inline-flex rounded-full bg-success/15 px-2 py-0.5 font-medium text-success">En poste</p>
                    )}
                    {exp.location && (
                      <p className="mt-1 inline-flex items-center gap-1">
                        <MapPin className="size-3" /> {exp.location}
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{exp.description}</p>
                {exp.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
