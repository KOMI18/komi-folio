// Lecture des données publiques côté serveur, mises en cache et invalidées par tag
// (le backend appelle /api/revalidate après chaque modification dans l'admin).
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { site } from "./site";
import type { EventItem, Paginated, Portfolio, PostDetail, PostSummary, Tag } from "./types";

class NotFoundError extends Error {}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${site.apiUrl}/api${path}`);
  if (res.status === 404) throw new NotFoundError(path);
  if (!res.ok) throw new Error(`API ${path} : ${res.status}`);
  return res.json() as Promise<T>;
}

// En cas de panne de l'API on sert une valeur vide, mise en cache quelques minutes seulement
// ("seconds" serait trop court pour être pré-rendu et ferait échouer le build)
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof NotFoundError) throw err;
    console.error(err);
    cacheLife("minutes");
    return fallback;
  }
}

export async function getPortfolio(): Promise<Portfolio> {
  "use cache";
  cacheTag("projects", "experiences", "skills", "education");
  cacheLife("days");
  return safe(() => get<Portfolio>("/portfolio"), { projects: [], experiences: [], skills: [], education: [] });
}

export async function getEvents(): Promise<EventItem[]> {
  "use cache";
  cacheTag("events");
  cacheLife("days");
  return safe(() => get<EventItem[]>("/events"), []);
}

export async function getPosts(opts: { page?: number; tag?: string; limit?: number } = {}) {
  "use cache";
  cacheTag("posts");
  cacheLife("days");
  const qs = new URLSearchParams();
  if (opts.page) qs.set("page", String(opts.page));
  if (opts.tag) qs.set("tag", opts.tag);
  if (opts.limit) qs.set("limit", String(opts.limit));
  return safe(() => get<Paginated<PostSummary>>(`/posts?${qs}`), { items: [], total: 0, page: 1, pages: 0 });
}

export async function getTags(): Promise<Tag[]> {
  "use cache";
  cacheTag("posts");
  cacheLife("days");
  return safe(() => get<Tag[]>("/posts/tags"), []);
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  "use cache";
  cacheTag("posts", `post:${slug}`);
  cacheLife("days");
  try {
    return await safe(() => get<PostDetail>(`/posts/${encodeURIComponent(slug)}`), null);
  } catch (err) {
    if (err instanceof NotFoundError) return null;
    throw err;
  }
}

// Toutes les URLs d'articles (sitemap, RSS, pré-rendu)
export async function getAllPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheTag("posts");
  cacheLife("days");
  return safe(async () => (await get<Paginated<PostSummary>>("/posts?limit=100")).items, []);
}

