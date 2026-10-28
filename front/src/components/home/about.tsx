import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import type { Education } from "@/lib/types";
import { site } from "@/lib/site";
import { Reveal } from "../site/reveal";
import { SectionHeading } from "../site/section-heading";

const stats = [
  { value: "3+", label: "ans d'expérience" },
  { value: "10+", label: "projets livrés" },
  { value: "5+", label: "clients accompagnés" },
  { value: "3", label: "SaaS lancés" },
];

export function About({ education }: { education: Education[] }) {
  return (
    <section id="about" className="py-24">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Du <span className="accent">parcours</span> aux résultats
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6">
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-3xl border">
              <Image
                src="/projects/parfaitkom.jpeg"
                alt="Portrait de Parfait Kom"
                fill
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                <span className="font-medium text-foreground">Développeur full-stack orienté résultats</span>, je conçois des
                applications et des systèmes intelligents qui automatisent les processus et font gagner du temps (et de
                l&apos;argent). Web, mobile, backend, IA : je maîtrise toute la chaîne pour livrer des solutions utiles, pas
                des démos.
              </p>
              <p>
                J&apos;automatise ce qui doit l&apos;être, je crée des assistants IA quand ça a du sens, et j&apos;écris du
                code propre, maintenable et efficace. Mon approche : impact réel, transparence totale, zéro bullshit.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/events" className="btn-primary">
                  Events & hackathons <ArrowUpRight className="size-4" />
                </Link>
                <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Télécharger mon CV <ArrowUpRight className="size-4" />
                </a>
              </div>
            </Reveal>

            <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-surface p-5">
                  <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </Reveal>

            {education.length > 0 && (
              <Reveal>
                <p className="eyebrow mb-4 flex items-center gap-2">
                  <GraduationCap className="size-4" /> Formation
                </p>
                <ol className="divide-y rounded-2xl border bg-surface">
                  {education.map((e) => (
                    <li key={e.id} className="grid gap-1 p-5 sm:grid-cols-[8rem_1fr]">
                      <span className="font-mono text-sm text-muted">{e.period}</span>
                      <div>
                        <p className="font-medium">{e.title}</p>
                        <p className="text-sm text-muted">{e.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
