"use client";

import { useEffect, useState } from "react";
import { AudioLines, Loader2, RefreshCw } from "lucide-react";
import { api } from "@/lib/admin-api";
import type { AudioStatus, Post } from "@/lib/types";
import { toast } from "./toast";

type AudioState = Pick<Post, "audioStatus" | "audioUrl" | "audioError">;

const labels: Record<AudioStatus, string> = {
  NONE: "Pas encore généré. Il le sera automatiquement à la publication.",
  PENDING: "Génération en cours… (1 à 3 min selon la longueur)",
  READY: "Prêt : les visiteurs entendent cette voix dans le mode écoute.",
  FAILED: "La génération a échoué. Le mode écoute utilise la voix du navigateur en attendant.",
};

// Audio du mode écoute (voix Kokoro générée sur le serveur) ; `refreshKey` change à chaque enregistrement
export function AudioPanel({ postId, refreshKey }: { postId: string; refreshKey: unknown }) {
  const [state, setState] = useState<AudioState | null>(null);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const load = () =>
      api<Post>(`/admin/posts/${postId}`)
        .then((p) => {
          if (cancelled) return;
          setState({ audioStatus: p.audioStatus, audioUrl: p.audioUrl, audioError: p.audioError });
          // Tant que la génération tourne, on revient voir toutes les 5 s
          if (p.audioStatus === "PENDING") timer = setTimeout(load, 5000);
        })
        .catch(() => {});
    // Laisse au serveur le temps de mettre l'article en file après l'enregistrement
    timer = setTimeout(load, 800);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [postId, refreshKey, requesting]);

  const regenerate = async () => {
    setRequesting(true);
    try {
      await api(`/admin/posts/${postId}/audio`, { method: "POST" });
      toast("Génération audio lancée");
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setRequesting(false);
    }
  };

  const status = state?.audioStatus ?? "NONE";

  return (
    <div className="card space-y-3 p-5">
      <p className="flex items-center gap-2 font-medium">
        <AudioLines className="size-4 text-primary" /> Mode écoute
      </p>
      {!state ? (
        <Loader2 className="size-4 animate-spin text-muted" />
      ) : (
        <>
          <p className="flex items-start gap-2 text-sm text-muted">
            {status === "PENDING" && <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin" />}
            {labels[status]}
          </p>
          {status === "FAILED" && state.audioError && <p className="rounded-lg bg-danger/10 p-2 font-mono text-xs text-danger">{state.audioError}</p>}
          {status === "READY" && state.audioUrl && <audio controls preload="none" src={state.audioUrl} className="w-full" />}
          <button type="button" onClick={regenerate} disabled={requesting || status === "PENDING"} className="btn-ghost w-full">
            <RefreshCw className="size-4" /> {status === "READY" ? "Régénérer l'audio" : "Générer l'audio"}
          </button>
        </>
      )}
    </div>
  );
}
