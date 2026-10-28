"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { postPublic } from "@/lib/public-api";
import { cn } from "@/lib/utils";

export function Newsletter({ className, compact }: { className?: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      await postPublic("/subscribers", { email });
      setState("done");
      setEmail("");
    } catch (err) {
      setError((err as Error).message);
      setState("error");
    }
  };

  return (
    <div className={cn("card relative overflow-hidden", compact ? "p-6" : "p-8 md:p-12", className)}>
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="relative grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 className={cn("mt-3 font-semibold tracking-tight", compact ? "text-xl" : "text-3xl")}>
            Les nouveaux articles, <span className="accent">directement</span> dans votre boîte mail
          </h2>
          <p className="mt-2 text-sm text-muted">Dev, produit, retours d&apos;expérience. Pas de spam, désinscription en un clic.</p>
        </div>
        {state === "done" ? (
          <p className="flex items-center gap-2 font-medium text-success">
            <Check className="size-5" /> Merci ! Vous êtes inscrit·e.
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Adresse email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="input rounded-full"
            />
            <button className="btn-accent shrink-0" disabled={state === "loading"}>
              {state === "loading" && <Loader2 className="size-4 animate-spin" />}
              S&apos;abonner
            </button>
          </form>
        )}
      </div>
      {state === "error" && <p className="relative mt-3 text-sm text-danger">{error}</p>}
    </div>
  );
}
