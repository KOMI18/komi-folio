"use client";

import { useEffect } from "react";
import { postPublic } from "@/lib/public-api";

// Compte une vue par article et par session de navigation
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    postPublic(`/posts/${encodeURIComponent(slug)}/view`).catch(() => {});
  }, [slug]);
  return null;
}
