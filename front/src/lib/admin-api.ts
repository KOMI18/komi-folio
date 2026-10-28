"use client";
// Client de l'API admin : le cookie de session httpOnly est posé par l'API (même site *.invity.site)
import { site } from "./site";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: Record<string, string[]>,
  ) {
    super(message);
  }
}

export async function api<T = unknown>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init;
  const res = await fetch(`${site.apiUrl}/api${path}`, {
    credentials: "include",
    ...rest,
    headers: { ...(json !== undefined ? { "Content-Type": "application/json" } : {}), ...headers },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined" && !location.pathname.startsWith("/admin/login")) {
      // Session expirée en cours d’édition : rechargement complet volontaire vers le login
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      location.assign(`/admin/login?next=${encodeURIComponent(location.pathname)}`);
    }
    throw new ApiError(res.status, data.error ?? "Erreur", data.details);
  }
  return data as T;
}

export async function uploadFile(file: File): Promise<{ url: string; name: string }> {
  const body = new FormData();
  body.append("file", file);
  return api("/admin/uploads", { method: "POST", body });
}
