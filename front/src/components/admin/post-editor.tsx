"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Bold,
  Code,
  ExternalLink,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  Loader2,
  Quote,
  Trash2,
} from "lucide-react";
import { api, ApiError, uploadFile } from "@/lib/admin-api";
import { site } from "@/lib/site";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Field, ImageInput, TagsInput, Toggle } from "./fields";
import { MarkdownPreview } from "./markdown-preview";
import { toast } from "./toast";

type Draft = Pick<Post, "title" | "slug" | "excerpt" | "content" | "coverImage" | "tags" | "status" | "featured" | "seoTitle" | "seoDescription"> & {
  publishedAt: string;
};

const empty: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: null,
  tags: [],
  status: "DRAFT",
  featured: false,
  seoTitle: "",
  seoDescription: "",
  publishedAt: "",
};

const toLocalInput = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "");

export function PostEditor() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const [draft, setDraft] = useState<Draft>(empty);
  const [saved, setSaved] = useState<Draft>(empty);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<"write" | "split" | "preview">("split");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const textarea = useRef<HTMLTextAreaElement>(null);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  useEffect(() => {
    if (!id) return;
    api<Post>(`/admin/posts/${id}`)
      .then((p) => {
        const d: Draft = {
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          content: p.content,
          coverImage: p.coverImage,
          tags: p.tags,
          status: p.status,
          featured: p.featured,
          seoTitle: p.seoTitle ?? "",
          seoDescription: p.seoDescription ?? "",
          publishedAt: toLocalInput(p.publishedAt),
        };
        setDraft(d);
        setSaved(d);
      })
      .catch((e) => toast(e.message, "error"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const save = useCallback(
    async (status?: Draft["status"]) => {
      setSaving(true);
      setErrors({});
      const body = {
        ...draft,
        status: status ?? draft.status,
        publishedAt: draft.publishedAt ? new Date(draft.publishedAt).toISOString() : null,
      };
      try {
        const post = await api<Post>(id ? `/admin/posts/${id}` : "/admin/posts", { method: id ? "PATCH" : "POST", json: body });
        const next = { ...draft, status: post.status, slug: post.slug, publishedAt: toLocalInput(post.publishedAt) };
        setDraft(next);
        setSaved(next);
        toast(post.status === "PUBLISHED" ? "Article publié" : "Brouillon enregistré");
        if (!id) router.replace(`/admin/posts/edit?id=${post.id}`);
      } catch (err) {
        if (err instanceof ApiError && err.details) setErrors(err.details);
        toast((err as Error).message, "error");
      } finally {
        setSaving(false);
      }
    },
    [draft, id, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  const remove = async () => {
    if (!id || !confirm("Supprimer définitivement cet article ?")) return;
    await api(`/admin/posts/${id}`, { method: "DELETE" });
    toast("Article supprimé");
    router.replace("/admin/posts");
  };

  // Insère du Markdown autour de la sélection courante
  const wrap = (before: string, after = "", placeholder = "") => {
    const el = textarea.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  };

  const insertImage = async (file: File) => {
    const marker = `![Envoi de ${file.name}…]()`;
    wrap(marker);
    try {
      const { url } = await uploadFile(file);
      setDraft((d) => ({ ...d, content: d.content.replace(marker, `![](${url})`) }));
    } catch (err) {
      setDraft((d) => ({ ...d, content: d.content.replace(marker, "") }));
      toast((err as Error).message, "error");
    }
  };

  const fileInput = useRef<HTMLInputElement>(null);
  // `insert` = [avant, après, texte par défaut] ; null = upload d'image
  const tools: { icon: typeof Bold; label: string; insert: [string, string, string] | null }[] = [
    { icon: Heading2, label: "Titre 2", insert: ["\n## ", "", "Titre"] },
    { icon: Heading3, label: "Titre 3", insert: ["\n### ", "", "Sous-titre"] },
    { icon: Bold, label: "Gras", insert: ["**", "**", "texte"] },
    { icon: Italic, label: "Italique", insert: ["_", "_", "texte"] },
    { icon: Link2, label: "Lien", insert: ["[", "](https://)", "texte du lien"] },
    { icon: List, label: "Liste", insert: ["\n- ", "", "élément"] },
    { icon: Quote, label: "Citation", insert: ["\n> ", "", "citation"] },
    { icon: Code, label: "Bloc de code", insert: ["\n```ts\n", "\n```\n", "// code"] },
    { icon: ImagePlus, label: "Image", insert: null },
  ];

  if (loading) return <Loader2 className="mx-auto mt-20 size-6 animate-spin text-muted" />;

  const seoTitle = draft.seoTitle || draft.title || "Titre de l'article";
  const seoDesc = draft.seoDescription || draft.excerpt || "Le résumé de l'article apparaîtra ici.";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/posts" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
          <ArrowLeft className="size-4" /> Articles
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("text-xs", dirty ? "text-primary" : "text-muted")}>{dirty ? "Modifications non enregistrées" : "Enregistré"}</span>
          {id && draft.status === "PUBLISHED" && (
            <a href={`/blog/${draft.slug}`} target="_blank" className="btn-ghost !px-3 !py-2" aria-label="Voir l'article">
              <ExternalLink className="size-4" />
            </a>
          )}
          {id && (
            <button onClick={remove} className="btn-ghost !px-3 !py-2 hover:text-danger" aria-label="Supprimer">
              <Trash2 className="size-4" />
            </button>
          )}
          {draft.status === "PUBLISHED" ? (
            <>
              <button className="btn-ghost" onClick={() => save("DRAFT")} disabled={saving}>
                Dépublier
              </button>
              <button className="btn-primary" onClick={() => save()} disabled={saving}>
                {saving && <Loader2 className="size-4 animate-spin" />} Mettre à jour
              </button>
            </>
          ) : (
            <>
              <button className="btn-ghost" onClick={() => save("DRAFT")} disabled={saving}>
                Enregistrer le brouillon
              </button>
              <button className="btn-accent" onClick={() => save("PUBLISHED")} disabled={saving}>
                {saving && <Loader2 className="size-4 animate-spin" />} Publier
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-4">
          <input
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Titre de l'article"
            className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-muted/50 md:text-4xl"
          />
          {errors.title && <p className="text-sm text-danger">{errors.title[0]}</p>}
          <Field label="Résumé" hint={`${draft.excerpt.length}/300 — affiché dans les listes et utilisé comme description SEO par défaut`}>
            <textarea className="input" rows={2} maxLength={300} value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </Field>
          {errors.excerpt && <p className="text-sm text-danger">{errors.excerpt[0]}</p>}

          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-surface-2/50 px-2 py-1.5">
              <div className="flex flex-wrap">
                {tools.map(({ icon: Icon, label, insert }) => (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    onClick={() => (insert ? wrap(...insert) : fileInput.current?.click())} className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface hover:text-foreground">
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
              <div className="flex rounded-lg border bg-surface p-0.5 text-xs">
                {(["write", "split", "preview"] as const).map((v) => (
                  <button key={v} onClick={() => setView(v)} className={cn("rounded-md px-2.5 py-1", view === v ? "bg-foreground text-background" : "text-muted")}>
                    {{ write: "Écrire", split: "Côte à côte", preview: "Aperçu" }[v]}
                  </button>
                ))}
              </div>
            </div>
            <div className={cn("grid min-h-[60vh]", view === "split" && "lg:grid-cols-2")}>
              {view !== "preview" && (
                <textarea
                  ref={textarea}
                  value={draft.content}
                  onChange={(e) => set("content", e.target.value)}
                  onPaste={(e) => {
                    const file = Array.from(e.clipboardData.files).find((f) => f.type.startsWith("image/"));
                    if (file) {
                      e.preventDefault();
                      insertImage(file);
                    }
                  }}
                  onDrop={(e) => {
                    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
                    if (file) {
                      e.preventDefault();
                      insertImage(file);
                    }
                  }}
                  placeholder="Écrivez en Markdown… (collez ou glissez une image pour l'uploader)"
                  className={cn("min-h-[60vh] w-full resize-none bg-transparent p-5 font-mono text-sm leading-relaxed outline-none", view === "split" && "lg:border-r")}
                />
              )}
              {view !== "write" && (
                <div className="max-h-[75vh] overflow-y-auto p-5">
                  <MarkdownPreview content={draft.content} />
                </div>
              )}
            </div>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) insertImage(file);
              e.target.value = "";
            }}
          />
        </div>

        <aside className="space-y-4">
          <div className="card space-y-4 p-5">
            <p className="font-medium">Publication</p>
            <p className="text-sm">
              Statut :{" "}
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", draft.status === "PUBLISHED" ? "bg-success/15 text-success" : "bg-surface-2 text-muted")}>
                {draft.status === "PUBLISHED" ? "Publié" : "Brouillon"}
              </span>
            </p>
            <Field label="Date de publication" hint="Vide = maintenant, au moment de publier">
              <input type="datetime-local" className="input" value={draft.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
            </Field>
            <Toggle checked={draft.featured} onChange={(v) => set("featured", v)} label="Article mis en avant" />
          </div>
          <div className="card space-y-4 p-5">
            <Field label="Image de couverture" hint="Affichée en haut de l’article et lors des partages sur les réseaux. Idéalement 1200×630 (ou 1600×900). Sans couverture : première image de l’article, sinon le logo.">
              <ImageInput value={draft.coverImage} onChange={(v) => set("coverImage", v)} />
            </Field>
            <Field label="Tags">
              <TagsInput value={draft.tags} onChange={(v) => set("tags", v)} placeholder="flutter, nodejs…" />
            </Field>
            <Field label="Slug (URL)" hint={`${site.url}/blog/${draft.slug || "…"}`}>
              <input className="input font-mono text-xs" value={draft.slug} onChange={(e) => set("slug", e.target.value)} placeholder="généré depuis le titre" />
            </Field>
          </div>
          <div className="card space-y-4 p-5">
            <p className="font-medium">SEO</p>
            <Field label="Titre SEO" hint={`${(draft.seoTitle || draft.title).length}/60 caractères conseillés`}>
              <input className="input" value={draft.seoTitle ?? ""} onChange={(e) => set("seoTitle", e.target.value)} placeholder={draft.title} />
            </Field>
            <Field label="Meta description" hint={`${(draft.seoDescription || draft.excerpt).length}/160 caractères conseillés`}>
              <textarea className="input" rows={3} value={draft.seoDescription ?? ""} onChange={(e) => set("seoDescription", e.target.value)} placeholder={draft.excerpt} />
            </Field>
            <div className="rounded-xl border bg-surface-2/50 p-3">
              <p className="mb-1 text-[11px] text-muted">Aperçu Google</p>
              <p className="truncate text-xs text-muted">{site.url.replace(/^https?:\/\//, "")} › blog › {draft.slug || "…"}</p>
              <p className="line-clamp-1 text-[15px] text-[#1a0dab] dark:text-[#8ab4f8]">{seoTitle} — Parfait Kom</p>
              <p className="line-clamp-2 text-xs text-muted">{seoDesc}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
