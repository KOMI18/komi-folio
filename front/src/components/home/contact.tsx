"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { postPublic } from "@/lib/public-api";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon, XIcon } from "../site/brand-icons";

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Téléphone / WhatsApp", value: site.phone, href: site.phoneHref },
  { icon: MapPin, label: "Localisation", value: site.location, href: null },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      await postPublic("/contact", form);
      setState("done");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError((err as Error).message);
      setState("error");
    }
  };

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section id="contact" className="py-24">
      <div className="container-page">
        <div className="card grid overflow-hidden lg:grid-cols-[1fr_1.2fr]">
          <div className="relative border-b p-8 md:p-12 lg:border-r lg:border-b-0">
            <div className="glow pointer-events-none absolute inset-0" />
            <div className="relative">
              <p className="eyebrow">Contact</p>
              <h2 className="heading mt-4">
                Un projet en tête ? <span className="accent">Parlons-en.</span>
              </h2>
              <p className="mt-4 text-muted">
                Décrivez votre idée en quelques lignes, je vous réponds sous 24 h avec une première estimation.
              </p>
              <ul className="mt-10 space-y-5">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="grid size-10 place-items-center rounded-xl border bg-surface-2">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs text-muted">{label}</p>
                      {href ? (
                        <a href={href} className="font-medium hover:text-primary">
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-2">
                {[
                  { href: site.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                  { href: site.socials.github, icon: GithubIcon, label: "GitHub" },
                  { href: site.socials.x, icon: XIcon, label: "X" },
                ].map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-10 place-items-center rounded-full border bg-surface transition hover:border-primary hover:text-primary">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {state === "done" ? (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/15 text-success">
                    <Check className="size-6" />
                  </span>
                  <p className="mt-4 text-xl font-semibold">Message envoyé !</p>
                  <p className="mt-1 text-muted">Je reviens vers vous très vite.</p>
                  <button className="btn-ghost mt-6" onClick={() => setState("idle")}>
                    Envoyer un autre message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium">Nom</span>
                    <input required value={form.name} onChange={update("name")} className="input" placeholder="Jean Dupont" autoComplete="name" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium">Email</span>
                    <input required type="email" value={form.email} onChange={update("email")} className="input" placeholder="jean@exemple.com" autoComplete="email" />
                  </label>
                </div>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Votre projet</span>
                  <textarea
                    required
                    minLength={5}
                    rows={7}
                    value={form.message}
                    onChange={update("message")}
                    className="input resize-none"
                    placeholder="Je souhaite créer une application qui…"
                  />
                </label>
                {state === "error" && <p className="text-sm text-danger">{error}</p>}
                <button className="btn-primary w-full py-3" disabled={state === "loading"}>
                  {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
