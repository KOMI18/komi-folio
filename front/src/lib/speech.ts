import type { Blockquote, List, Root, RootContent } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

// Une ligne du mode écoute : ce qui s'affiche et ce que la voix prononce (identiques sauf pour les notes)
export interface SpeechSegment {
  kind: "heading" | "text" | "quote" | "item" | "note";
  text: string;
  speak?: string;
}

const segmenter = new Intl.Segmenter("fr", { granularity: "sentence" });

// Les emojis sont lus à voix haute (« panneau d'avertissement »…) : on les retire
const clean = (s: string) =>
  s
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const sentences = (text: string, kind: SpeechSegment["kind"]): SpeechSegment[] =>
  Array.from(segmenter.segment(clean(text)), (s) => s.segment.trim())
    .filter(Boolean)
    .map((t, i) => ({ kind: i === 0 ? kind : kind === "item" ? "text" : kind, text: t }));

const note = (text: string, speak: string): SpeechSegment => ({ kind: "note", text, speak });

function walk(node: RootContent, out: SpeechSegment[], inherited?: "quote") {
  switch (node.type) {
    case "heading":
      out.push({ kind: "heading", text: clean(toString(node)) });
      break;
    case "paragraph": {
      // Paragraphe composé uniquement d'images : rien à lire
      if (node.children.every((c) => c.type === "image" || (c.type === "text" && !c.value.trim()))) break;
      out.push(...sentences(toString(node), inherited ?? "text"));
      break;
    }
    case "blockquote":
      (node as Blockquote).children.forEach((c) => walk(c, out, "quote"));
      break;
    case "list":
      for (const item of (node as List).children) {
        for (const child of item.children) {
          if (child.type === "paragraph") out.push(...sentences(toString(child), "item"));
          else walk(child, out, inherited);
        }
      }
      break;
    case "code":
      out.push(note("Exemple de code", "Un exemple de code est affiché dans l'article."));
      break;
    case "table":
      out.push(note("Tableau", "Un tableau est affiché dans l'article."));
      break;
  }
}

// Découpe un article Markdown en phrases à lire, dans l'ordre
export function toSpeechSegments(markdown: string): SpeechSegment[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
  const out: SpeechSegment[] = [];
  tree.children.forEach((n) => walk(n, out));
  return out.filter((s) => s.text);
}
