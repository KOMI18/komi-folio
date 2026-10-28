import Link from "next/link";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "./brand-icons";
import { nav, site } from "@/lib/site";
import { Year } from "./year";

const socials = [
  { href: site.socials.github, label: "GitHub", icon: GithubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: site.socials.x, label: "X", icon: XIcon },
  { href: site.socials.instagram, label: "Instagram", icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="max-w-sm text-sm text-muted">
            Développeur full-stack web & mobile. Je construis des produits utiles, de l&apos;idée à la mise en production.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Navigation</p>
          <ul className="grid gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Ailleurs</p>
          <ul className="grid gap-2 text-sm">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition hover:text-foreground">
                  <Icon className="size-4" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>
            © <Year /> {site.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
