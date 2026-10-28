"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Reply, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/shell";
import { toast } from "@/components/admin/toast";
import { api } from "@/lib/admin-api";
import { cn, formatDate } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const load = () => api<Message[]>("/admin/messages").then(setMessages).catch((e) => toast(e.message, "error"));
  useEffect(() => {
    load();
  }, []);

  const markRead = async (m: Message, read = true) => {
    await api(`/admin/messages/${m.id}`, { method: "PATCH", json: { read } });
    load();
  };
  const remove = async (m: Message) => {
    if (!confirm("Supprimer ce message ?")) return;
    await api(`/admin/messages/${m.id}`, { method: "DELETE" });
    load();
  };

  return (
    <>
      <PageHeader title="Messages" description="Les demandes reçues via le formulaire de contact." />
      {!messages ? (
        <Loader2 className="mx-auto size-6 animate-spin text-muted" />
      ) : messages.length === 0 ? (
        <div className="card p-12 text-center text-muted">Aucun message pour l&apos;instant.</div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id} className={cn("card p-5", !m.read && "border-primary/50")}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 font-medium">
                    {!m.read && <span className="size-2 rounded-full bg-primary" />}
                    {m.name}
                  </p>
                  <a href={`mailto:${m.email}`} className="text-sm text-muted hover:text-primary">
                    {m.email}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <span className="mr-2 text-xs text-muted">{formatDate(m.createdAt, { dateStyle: "medium", timeStyle: "short" })}</span>
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: votre message")}`} onClick={() => markRead(m)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2" aria-label="Répondre">
                    <Reply className="size-4" />
                  </a>
                  <button onClick={() => markRead(m, !m.read)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2" aria-label={m.read ? "Marquer non lu" : "Marquer lu"}>
                    <Mail className="size-4" />
                  </button>
                  <button onClick={() => remove(m)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-danger" aria-label="Supprimer">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <p className="mt-4 text-sm whitespace-pre-wrap">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
