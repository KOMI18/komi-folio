import GithubSlugger from "github-slugger";

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

// Même algorithme de slug que rehype-slug, pour que les ancres du sommaire correspondent
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const headings: Heading[] = [];
  for (const match of withoutCode.matchAll(/^(#{2,3})\s+(.+?)\s*#*$/gm)) {
    const text = match[2].replace(/[*_`~]|\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    headings.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
}
