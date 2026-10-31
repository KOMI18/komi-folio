import type { Post } from "./types";
import { site } from "./site";

// Image de partage par défaut (logo), utilisée quand une page n'a pas d'image propre
export const defaultOgImage = { url: "/og-default.png", width: 1200, height: 630, alt: site.name };

const markdownImage = /!\[[^\]]*\]\(\s*<?([^)\s>]+)/;
const htmlImage = /<img[^>]+src=["']([^"']+)["']/i;

const absolute = (src: string) => {
  try {
    return new URL(src, site.url).toString();
  } catch {
    return null;
  }
};

// Image d'un article sur les réseaux : couverture, sinon première image du contenu, sinon le logo
export function postOgImage(post: Pick<Post, "title" | "coverImage" | "content">) {
  const src = post.coverImage || post.content.match(markdownImage)?.[1] || post.content.match(htmlImage)?.[1];
  const url = src && absolute(src);
  return url ? { url, alt: post.title } : defaultOgImage;
}
