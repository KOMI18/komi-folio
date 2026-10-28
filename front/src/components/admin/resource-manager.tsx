"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Eye, EyeOff, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { api, ApiError } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { Field, ImageInput, Modal, TagsInput, Toggle } from "./fields";
import { PageHeader } from "./shell";
import { toast } from "./toast";

export type FieldDef =
  | { name: string; label: string; type: "text" | "url" | "color" | "date" | "number"; required?: boolean; hint?: string; full?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; hint?: string; rows?: number }
  | { name: string; label: string; type: "image" | "tags"; hint?: string }
  | { name: string; label: string; type: "boolean" }
  | { name: string; label: string; type: "select"; options: { value: string; label: string }[] };

type Item = Record<string, unknown> & { id: string };

export interface ResourceConfig {
  title: string;
  description?: string;
  endpoint: string;
  singular: string;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
  render: (item: Item) => { title: ReactNode; subtitle?: ReactNode; image?: string | null };
}

// Les dates arrivent en ISO ; l'input date attend AAAA-MM-JJ
const toInput = (field: FieldDef, value: unknown) => (field.type === "date" && typeof value === "string" ? value.slice(0, 10) : value);

export function ResourceManager({ config }: { config: ResourceConfig }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api<Item[]>(`/admin/${config.endpoint}`)
      .then(setItems)
      .catch((e) => toast(e.message, "error"));
  }, [config.endpoint]);

  useEffect(load, [load]);

  const openNew = () => {
    setErrors({});
    setEditing({ ...config.defaults, order: items?.length ?? 0 });
  };
  const openEdit = (item: Item) => {
    setErrors({});
    const values: Record<string, unknown> = { id: item.id };
    for (const f of [...config.fields, { name: "order", type: "number" } as FieldDef]) values[f.name] = toInput(f, item[f.name]);
    setEditing(values);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, ...data } = editing;
    for (const f of config.fields) if (f.type === "date" && data[f.name] === "") data[f.name] = null;
    try {
      await api(`/admin/${config.endpoint}${id ? `/${id}` : ""}`, { method: id ? "PATCH" : "POST", json: data });
      toast(id ? "Modifications enregistrées" : `${config.singular} ajouté·e`);
      setEditing(null);
      load();
    } catch (err) {
      if (err instanceof ApiError && err.details) setErrors(err.details);
      toast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: Item) => {
    if (!confirm("Supprimer définitivement cet élément ?")) return;
    try {
      await api(`/admin/${config.endpoint}/${item.id}`, { method: "DELETE" });
      toast("Supprimé");
      load();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  const toggleVisible = async (item: Item) => {
    await api(`/admin/${config.endpoint}/${item.id}`, { method: "PATCH", json: { visible: !item.visible } })
      .then(load)
      .catch((e) => toast(e.message, "error"));
  };

  const set = (name: string, value: unknown) => setEditing((e) => ({ ...e, [name]: value }));

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <button className="btn-primary" onClick={openNew}>
            <Plus className="size-4" /> Ajouter
          </button>
        }
      />

      {!items ? (
        <Loader2 className="mx-auto size-6 animate-spin text-muted" />
      ) : items.length === 0 ? (
        <div className="card p-12 text-center text-muted">Aucun élément pour l&apos;instant.</div>
      ) : (
        <ul className="card divide-y">
          {items.map((item) => {
            const view = config.render(item);
            return (
              <li key={item.id} className={cn("flex items-center gap-4 p-4", item.visible === false && "opacity-50")}>
                <span className="w-6 text-center font-mono text-xs text-muted">{String(item.order ?? "")}</span>
                {view.image !== undefined && (
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-lg border bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {view.image && <img src={view.image} alt="" className="size-full object-cover" />}
                  </span>
                )}
                <button className="min-w-0 flex-1 text-left" onClick={() => openEdit(item)}>
                  <p className="truncate font-medium">{view.title}</p>
                  {view.subtitle && <p className="truncate text-sm text-muted">{view.subtitle}</p>}
                </button>
                <div className="flex shrink-0 gap-1">
                  {"visible" in item && (
                    <button onClick={() => toggleVisible(item)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2" aria-label={item.visible ? "Masquer" : "Afficher"}>
                      {item.visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                    </button>
                  )}
                  <button onClick={() => openEdit(item)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2" aria-label="Modifier">
                    <Pencil className="size-4" />
                  </button>
                  <button onClick={() => remove(item)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-danger" aria-label="Supprimer">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? `Modifier` : `Nouveau : ${config.singular}`}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setEditing(null)}>
              Annuler
            </button>
            <button className="btn-primary" onClick={save} disabled={saving}>
              {saving && <Loader2 className="size-4 animate-spin" />} Enregistrer
            </button>
          </>
        }
      >
        {editing && (
          <form
            className="grid grid-cols-2 gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            {config.fields.map((f) => {
              const value = editing[f.name];
              const error = errors[f.name]?.[0];
              const wide = f.type !== "boolean" && f.type !== "color" && f.type !== "number" && f.type !== "date" && f.type !== "select";
              let input: ReactNode;
              switch (f.type) {
                case "textarea":
                  input = <textarea className="input" rows={f.rows ?? 4} required={f.required} value={(value as string) ?? ""} onChange={(e) => set(f.name, e.target.value)} />;
                  break;
                case "image":
                  input = <ImageInput value={(value as string) ?? null} onChange={(v) => set(f.name, v)} />;
                  break;
                case "tags":
                  input = <TagsInput value={(value as string[]) ?? []} onChange={(v) => set(f.name, v)} placeholder="Entrée pour valider" />;
                  break;
                case "boolean":
                  return (
                    <div key={f.name} className="col-span-2 sm:col-span-1">
                      <Toggle checked={Boolean(value)} onChange={(v) => set(f.name, v)} label={f.label} />
                    </div>
                  );
                case "select":
                  input = (
                    <select className="input" value={(value as string) ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                      {f.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  );
                  break;
                case "number":
                  input = <input className="input" type="number" value={(value as number | null) ?? ""} onChange={(e) => set(f.name, e.target.value === "" ? null : Number(e.target.value))} />;
                  break;
                case "color":
                  input = (
                    <div className="flex gap-2">
                      <input type="color" className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border bg-surface" value={(value as string) || "#7c6cf0"} onChange={(e) => set(f.name, e.target.value)} />
                      <input className="input" value={(value as string) ?? ""} onChange={(e) => set(f.name, e.target.value)} />
                    </div>
                  );
                  break;
                default:
                  input = <input className="input" type={f.type} required={f.required} value={(value as string) ?? ""} onChange={(e) => set(f.name, e.target.value)} />;
              }
              return (
                <Field
                  key={f.name}
                  label={f.label}
                  hint={error ? <span className="text-danger">{error}</span> : "hint" in f ? f.hint : undefined}
                  className={wide || ("full" in f && f.full) ? "col-span-2" : "col-span-2 sm:col-span-1"}
                >
                  {input}
                </Field>
              );
            })}
            <Field label="Ordre d'affichage" hint="Plus petit = affiché en premier" className="col-span-2 sm:col-span-1">
              <input className="input" type="number" value={(editing.order as number) ?? 0} onChange={(e) => set("order", Number(e.target.value))} />
            </Field>
            <button type="submit" hidden />
          </form>
        )}
      </Modal>
    </>
  );
}
