"use client";

import { useRef, useState, type ReactNode } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadFile } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { toast } from "./toast";

export function Field({ label, hint, children, className }: { label: string; hint?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex items-center gap-3 text-sm">
      <span className={cn("relative h-6 w-10 rounded-full border transition", checked ? "border-primary bg-primary" : "bg-surface-2")}>
        <span className={cn("absolute top-0.5 size-[18px] rounded-full bg-white shadow transition-all", checked ? "left-[18px]" : "left-0.5")} />
      </span>
      {label}
    </button>
  );
}

// Saisie de tags séparés par des virgules ou Entrée
export function TagsInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const next = raw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !value.includes(t));
    if (next.length) onChange([...value, ...next]);
    setDraft("");
  };
  return (
    <div className="input flex flex-wrap items-center gap-1.5 !py-2">
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-full bg-surface-2 py-0.5 pr-1 pl-2.5 text-xs">
          {t}
          <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Retirer ${t}`} className="rounded-full p-0.5 hover:bg-border">
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft && add(draft)}
        placeholder={value.length ? "" : placeholder}
        className="min-w-24 flex-1 bg-transparent outline-none"
      />
    </div>
  );
}

export function ImageInput({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const upload = async (file: File) => {
    setLoading(true);
    try {
      const { url } = await uploadFile(file);
      onChange(url);
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) upload(file);
        }}
        className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed bg-surface-2 text-muted transition hover:border-primary"
        aria-label="Choisir une image"
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <ImagePlus className="size-5" />
        )}
      </button>
      <div className="min-w-0 flex-1 space-y-2">
        <input className="input" value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} placeholder="URL ou /projects/image.png" />
        <div className="flex gap-2 text-xs">
          <button type="button" className="text-primary hover:underline" onClick={() => ref.current?.click()}>
            Uploader
          </button>
          {value && (
            <button type="button" className="text-muted hover:text-danger" onClick={() => onChange(null)}>
              Retirer
            </button>
          )}
        </div>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className="flex h-full w-full max-w-xl flex-col border-l bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Fermer" className="grid size-8 place-items-center rounded-full hover:bg-surface-2">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
