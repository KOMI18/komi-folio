import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { dateStyle: "long" }) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", { timeZone: "Africa/Douala", ...opts }).format(new Date(iso));
}

export function formatPeriod(start: string, end: string | null) {
  const fmt = (d: string) => formatDate(d, { month: "short", year: "numeric" });
  return `${fmt(start)} — ${end ? fmt(end) : "aujourd'hui"}`;
}
