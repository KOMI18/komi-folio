import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import type { Skill } from "@/lib/types";
import { RotatingWord } from "./rotating-word";

export function Hero({ stack }: { stack: Skill[] }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow pointer-events-none absolute inset-0" />

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border bg-surface/80 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Disponible pour de nouveaux projets
          </p>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Je construis des applications <RotatingWord words={["scalables", "rentables", "modernes"]} />
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-muted md:text-xl">
            Développeur full-stack basé à Yaoundé. Je transforme vos idées en applications web et mobiles complètes, de la
            conception au déploiement.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#projects" className="btn-primary px-6 py-3">
              Voir mes réalisations <ArrowDownRight className="size-4" />
            </Link>
            <Link href="/blog" className="btn-ghost px-6 py-3">
              Lire le blog <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {stack.length > 0 && (
          <div className="mx-auto mt-20 max-w-3xl">
            <p className="eyebrow mb-6 text-center">Stack principale</p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
              <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
                {[...stack, ...stack].map((s, i) => (
                  <li
                    key={`${s.id}-${i}`}
                    aria-hidden={i >= stack.length}
                    className="flex items-center gap-2.5 rounded-full border bg-surface px-4 py-2 text-sm"
                  >
                    {s.icon && (
                      // Fond clair : beaucoup de logos de marque sont noirs
                      <span className="grid size-6 place-items-center rounded-full bg-white">
                        <Image src={s.icon} alt="" width={16} height={16} className="size-4 object-contain" unoptimized />
                      </span>
                    )}
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
