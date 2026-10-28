"use client";

import { useEffect, useState } from "react";

export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-block">
      {/* Mot le plus long en invisible pour réserver la largeur et éviter les sauts de mise en page */}
      <span className="invisible">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
      <span key={i} className="accent absolute inset-0 animate-word">
        {words[i]}
      </span>
    </span>
  );
}
