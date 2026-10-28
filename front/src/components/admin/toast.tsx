"use client";

import { useSyncExternalStore } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

let toasts: Toast[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toast(message: string, type: Toast["type"] = "success") {
  const id = Date.now() + Math.random();
  toasts = [...toasts, { id, message, type }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 3500);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const empty: Toast[] = [];

export function Toaster() {
  const list = useSyncExternalStore(subscribe, () => toasts, () => empty);
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[100] flex flex-col gap-2" aria-live="polite">
      {list.map((t) => (
        <div key={t.id} className="card pointer-events-auto flex items-center gap-2 px-4 py-3 text-sm shadow-xl">
          {t.type === "success" ? <CheckCircle2 className="size-4 text-success" /> : <XCircle className="size-4 text-danger" />}
          {t.message}
        </div>
      ))}
    </div>
  );
}
