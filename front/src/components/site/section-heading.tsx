import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({ title, intro }: { title: ReactNode; intro?: ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-2xl space-y-4">
      <h2 className="heading">{title}</h2>
      {intro && <p className="text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}
