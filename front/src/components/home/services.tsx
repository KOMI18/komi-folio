import { Code2, RefreshCw, Smartphone, Workflow } from "lucide-react";
import { Reveal } from "../site/reveal";
import { SectionHeading } from "../site/section-heading";

const services = [
  {
    icon: Code2,
    title: "Développement web",
    text: "Applications web rapides et scalables avec React, Next.js et Node.js, prêtes à être lancées et référencées.",
    points: ["Performance & SEO", "Architecture scalable", "API robustes"],
  },
  {
    icon: Smartphone,
    title: "Applications mobiles",
    text: "Apps Flutter cross-platform iOS & Android : interface fluide, performances solides, un seul code.",
    points: ["Flutter & Dart", "UI/UX soignée", "Offline-first"],
  },
  {
    icon: Workflow,
    title: "Automatisation & IA",
    text: "Workflows n8n et assistants IA qui vendent, répondent et encaissent pendant que vous dormez.",
    points: ["n8n", "Assistants WhatsApp", "Intégrations paiement"],
  },
  {
    icon: RefreshCw,
    title: "Refonte & modernisation",
    text: "Site lent, dépassé ou pas responsive ? Audit, migration sécurisée et design system moderne.",
    points: ["Audit complet", "Migration sans perte", "Design moderne"],
  },
];

export function Services() {
  return (
    <section id="expertise" className="py-24">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Du concept à la prod, <span className="accent">sans détour</span>
            </>
          }
          intro="Je prends en charge toute la chaîne technique pour que vous puissiez vous concentrer sur votre croissance."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text, points }, i) => (
            <Reveal key={title} delay={i * 80} className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:border-primary/40">
              <span className="mb-6 grid size-11 place-items-center rounded-xl border bg-surface-2 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {points.map((p) => (
                  <li key={p} className="chip">
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
