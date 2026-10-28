import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GithubIcon } from "../site/brand-icons";
import { Reveal } from "../site/reveal";
import { SectionHeading } from "../site/section-heading";

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const href = project.demoUrl || project.githubUrl || undefined;
  return (
    <article className={cn("card group flex h-full flex-col overflow-hidden transition hover:border-primary/40", large && "md:flex-row")}>
      <div className={cn("relative aspect-[16/10] overflow-hidden border-b bg-surface-2", large && "md:aspect-auto md:w-3/5 md:border-r md:border-b-0")}>
        {project.image && (
          <Image
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className={cn("flex flex-1 flex-col p-6", large && "md:justify-center md:p-8")}>
        <h3 className={cn("font-semibold tracking-tight", large ? "text-2xl" : "text-lg")}>{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-2">
          {href && project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2">
              Voir le projet <ArrowUpRight className="size-4" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2" aria-label={`Code source de ${project.title}`}>
              <GithubIcon className="size-4" /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <section id="projects" className="py-24">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Des produits <span className="accent">en production</span>
            </>
          }
          intro="SaaS, applications mobiles, plateformes e-commerce : une sélection de ce que j'ai conçu et livré."
        />
        <div className="space-y-4">
          {featured.map((p) => (
            <Reveal key={p.id}>
              <ProjectCard project={p} large />
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
