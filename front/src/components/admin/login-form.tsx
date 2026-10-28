"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { api } from "@/lib/admin-api";

export function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api("/auth/login", { method: "POST", json: { email, password } });
      router.replace(next.startsWith("/admin") ? next : "/admin");
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card relative w-full max-w-sm space-y-5 p-8 shadow-2xl shadow-black/10">
      <div className="space-y-2 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border bg-surface-2">
          <Lock className="size-5" />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Espace admin</h1>
        <p className="text-sm text-muted">Connectez-vous pour gérer le blog et le portfolio.</p>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Email</span>
        <input className="input" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Mot de passe</span>
        <input className="input" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button className="btn-primary w-full py-3" disabled={loading}>
        {loading && <Loader2 className="size-4 animate-spin" />} Se connecter
      </button>
    </form>
  );
}
