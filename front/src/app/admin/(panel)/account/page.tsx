"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Field } from "@/components/admin/fields";
import { PageHeader, useAdmin } from "@/components/admin/shell";
import { toast } from "@/components/admin/toast";
import { api } from "@/lib/admin-api";

const MIN_LENGTH = 10;

export default function AccountPage() {
  const admin = useAdmin();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  const tooShort = next.length > 0 && next.length < MIN_LENGTH;
  const mismatch = confirm.length > 0 && next !== confirm;
  const sameAsCurrent = next.length > 0 && next === current;
  const canSubmit = current && next.length >= MIN_LENGTH && next === confirm && !sameAsCurrent && !saving;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    try {
      await api("/auth/password", { method: "POST", json: { current, next } });
      setCurrent("");
      setNext("");
      setConfirm("");
      toast("Mot de passe mis à jour");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Erreur", "error");
    } finally {
      setSaving(false);
    }
  };

  const type = show ? "text" : "password";

  return (
    <>
      <PageHeader title="Compte" description={admin ? `Connecté en tant que ${admin.email}` : undefined} />
      <form onSubmit={submit} className="card max-w-lg space-y-5 p-6">
        <h2 className="font-semibold">Changer le mot de passe</h2>
        <Field label="Mot de passe actuel">
          <input className="input" type={type} autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
        </Field>
        <Field
          label="Nouveau mot de passe"
          hint={
            tooShort ? (
              <span className="text-danger">Au moins {MIN_LENGTH} caractères.</span>
            ) : sameAsCurrent ? (
              <span className="text-danger">Doit être différent du mot de passe actuel.</span>
            ) : (
              `Au moins ${MIN_LENGTH} caractères. Une phrase de passe ou un mot de passe généré, c'est encore mieux.`
            )
          }
        >
          <input className="input" type={type} autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} minLength={MIN_LENGTH} required />
        </Field>
        <Field label="Confirmer le nouveau mot de passe" hint={mismatch ? <span className="text-danger">Les deux mots de passe ne correspondent pas.</span> : undefined}>
          <input className="input" type={type} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button type="button" onClick={() => setShow((s) => !s)} className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {show ? "Masquer" : "Afficher"} les mots de passe
          </button>
          <button type="submit" className="btn-accent" disabled={!canSubmit}>
            {saving && <Loader2 className="size-4 animate-spin" />}
            Mettre à jour
          </button>
        </div>
      </form>
    </>
  );
}
