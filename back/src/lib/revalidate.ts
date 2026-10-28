import { env } from "../env.js";

export type CacheTag = "posts" | "projects" | "experiences" | "skills" | "education" | "events";

// Demande au front Next.js de purger son cache ISR. Ne bloque jamais la requête admin.
export function revalidate(tags: CacheTag[]): void {
  if (!env.FRONT_URL || !env.REVALIDATE_SECRET) return;
  fetch(`${env.FRONT_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-revalidate-secret": env.REVALIDATE_SECRET },
    body: JSON.stringify({ tags }),
  }).catch((err) => console.warn("Revalidation échouée :", err.message));
}
