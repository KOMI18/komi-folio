"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Loader2, Trash2, Upload } from "lucide-react";
import { PageHeader } from "@/components/admin/shell";
import { toast } from "@/components/admin/toast";
import { api, uploadFile } from "@/lib/admin-api";

interface Media {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<Media[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const load = () => api<Media[]>("/admin/uploads").then(setFiles).catch((e) => toast(e.message, "error"));
  useEffect(() => {
    load();
  }, []);

  const upload = async (list: FileList | null) => {
    if (!list?.length) return;
    setUploading(true);
    for (const file of Array.from(list)) await uploadFile(file).catch((e) => toast(e.message, "error"));
    setUploading(false);
    load();
  };

  return (
    <>
      <PageHeader
        title="Médias"
        description="Images uploadées, utilisables dans les articles et les projets."
        actions={
          <button className="btn-primary" onClick={() => input.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Uploader
          </button>
        }
      />
      <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
      {!files ? (
        <Loader2 className="mx-auto size-6 animate-spin text-muted" />
      ) : files.length === 0 ? (
        <div className="card p-12 text-center text-muted">Aucune image.</div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((f) => (
            <li key={f.name} className="card group overflow-hidden">
              <div className="relative aspect-square bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.url} alt="" loading="lazy" className="size-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100">
                  <button onClick={() => navigator.clipboard.writeText(f.url).then(() => toast("URL copiée"))} className="grid size-9 place-items-center rounded-full bg-white text-black" aria-label="Copier l'URL">
                    <Copy className="size-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm("Supprimer cette image ? Elle disparaîtra des pages qui l'utilisent.")) return;
                      await api(`/admin/uploads/${encodeURIComponent(f.name)}`, { method: "DELETE" });
                      load();
                    }}
                    className="grid size-9 place-items-center rounded-full bg-white text-red-600"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <p className="truncate px-3 py-2 text-xs text-muted">{(f.size / 1024).toFixed(0)} Ko</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
