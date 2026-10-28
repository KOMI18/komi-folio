"use client";

import { useEffect, useState } from "react";
import { Copy, Download, Loader2, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/shell";
import { toast } from "@/components/admin/toast";
import { api } from "@/lib/admin-api";
import { formatDate } from "@/lib/utils";

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const [subs, setSubs] = useState<Subscriber[] | null>(null);
  const load = () => api<Subscriber[]>("/admin/subscribers").then(setSubs).catch((e) => toast(e.message, "error"));
  useEffect(() => {
    load();
  }, []);

  const exportCsv = () => {
    const csv = ["email,date", ...(subs ?? []).map((s) => `${s.email},${s.createdAt}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "abonnes.csv" });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Abonnés newsletter"
        description={subs ? `${subs.length} abonné·e·s` : undefined}
        actions={
          <>
            <button
              className="btn-ghost"
              onClick={() => navigator.clipboard.writeText((subs ?? []).map((s) => s.email).join(", ")).then(() => toast("Emails copiés"))}
            >
              <Copy className="size-4" /> Copier
            </button>
            <button className="btn-primary" onClick={exportCsv}>
              <Download className="size-4" /> CSV
            </button>
          </>
        }
      />
      {!subs ? (
        <Loader2 className="mx-auto size-6 animate-spin text-muted" />
      ) : subs.length === 0 ? (
        <div className="card p-12 text-center text-muted">Aucun abonné pour l&apos;instant.</div>
      ) : (
        <ul className="card divide-y">
          {subs.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
              <span className="truncate">{s.email}</span>
              <span className="flex items-center gap-3 text-muted">
                {formatDate(s.createdAt, { dateStyle: "medium" })}
                <button
                  onClick={async () => {
                    if (!confirm(`Désinscrire ${s.email} ?`)) return;
                    await api(`/admin/subscribers/${s.id}`, { method: "DELETE" });
                    load();
                  }}
                  className="grid size-8 place-items-center rounded-full hover:bg-surface-2 hover:text-danger"
                  aria-label="Supprimer"
                >
                  <Trash2 className="size-4" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
