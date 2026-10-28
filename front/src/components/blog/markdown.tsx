import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

// Rendu serveur mis en cache : la coloration syntaxique (Shiki) ne coûte rien côté navigateur
export async function Markdown({ content }: { content: string }) {
  "use cache";
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: true }],
      ]}
      components={{
        a: ({ href = "", ...props }) =>
          href.startsWith("http") ? <a href={href} target="_blank" rel="noopener noreferrer" {...props} /> : <a href={href} {...props} />,
        // eslint-disable-next-line @next/next/no-img-element
        img: ({ alt = "", ...props }) => <img alt={alt} loading="lazy" decoding="async" {...props} />,
      }}
    >
      {content}
    </MarkdownAsync>
  );
}
