"use client";
import { site } from "./site";

// Appels publics depuis le navigateur (formulaires, compteur de vues)
export async function postPublic(path: string, body?: unknown): Promise<void> {
  const res = await fetch(`${site.apiUrl}/api${path}`, {
    method: "POST",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(res.status === 429 ? "Trop de tentatives, réessayez dans quelques minutes." : (data.error ?? "Échec de l'envoi"));
  }
}
