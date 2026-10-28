import { z } from "zod";

// Champ texte facultatif : "" devient null pour pouvoir vider la valeur depuis l'admin
const optStr = z
  .string()
  .trim()
  .nullish()
  .transform((v) => (v ? v : null));
const tags = z.array(z.string().trim().min(1)).default([]);
const order = z.coerce.number().int().default(0);

export const projectSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  image: optStr,
  tags,
  demoUrl: optStr,
  githubUrl: optStr,
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  order,
});

export const experienceSchema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  logo: optStr,
  link: optStr,
  location: optStr,
  description: z.string().trim().min(1),
  tags,
  color: z.string().trim().default("#7c6cf0"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullish(),
  visible: z.boolean().default(true),
  order,
});

export const skillSchema = z.object({
  name: z.string().trim().min(1),
  category: z.enum(["FRONTEND", "BACKEND", "TOOLS"]),
  icon: optStr,
  description: optStr,
  experience: optStr,
  mastery: optStr,
  showInHero: z.boolean().default(false),
  visible: z.boolean().default(true),
  order,
});

export const educationSchema = z.object({
  title: z.string().trim().min(1),
  level: z.string().trim().min(1),
  period: z.string().trim().min(1),
  description: z.string().trim().min(1),
  visible: z.boolean().default(true),
  order,
});

export const eventSchema = z.object({
  title: z.string().trim().min(1),
  type: z.enum(["HACKATHON", "COMPETITION", "CONFERENCE"]),
  date: z.string().trim().min(1),
  location: optStr,
  position: optStr,
  project: optStr,
  url: optStr,
  attendees: optStr,
  teamSize: z.coerce.number().int().nullish(),
  tech: tags,
  achievements: tags,
  description: z.string().trim().min(1),
  image: optStr,
  isWinner: z.boolean().default(false),
  visible: z.boolean().default(true),
  order,
});

export const postSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().min(1).max(300),
  content: z.string().default(""),
  coverImage: optStr,
  tags,
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  seoTitle: optStr,
  seoDescription: optStr,
  publishedAt: z.coerce.date().nullish(),
});
