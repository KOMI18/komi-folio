"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Aperçu rapide côté navigateur (sans coloration syntaxique, faite au rendu serveur)
export function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-article max-w-none">
      <Markdown remarkPlugins={[remarkGfm]}>{content || "*Rien à afficher pour l'instant.*"}</Markdown>
    </div>
  );
}
