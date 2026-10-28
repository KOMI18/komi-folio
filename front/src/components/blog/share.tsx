"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { LinkedinIcon, XIcon } from "../site/brand-icons";

export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn = "grid size-9 place-items-center rounded-full border bg-surface transition hover:border-primary hover:text-primary";
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm text-muted">Partager</span>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur LinkedIn">
        <LinkedinIcon className="size-4" />
      </a>
      <a className={btn} href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur X">
        <XIcon className="size-3.5" />
      </a>
      <a className={btn} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur WhatsApp">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.42 9.42 0 1 1 7.99 4.42Zm8.02-17.44A11.33 11.33 0 0 0 2.24 17.73L.63 23.6l6-1.57a11.3 11.3 0 0 0 5.42 1.38c6.25 0 11.33-5.08 11.34-11.33 0-3.03-1.18-5.88-3.32-8.02Z" />
        </svg>
      </a>
      <button
        className={btn}
        aria-label="Copier le lien"
        onClick={() => {
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {copied ? <Check className="size-4 text-success" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
