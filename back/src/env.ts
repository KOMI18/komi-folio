import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32, "JWT_SECRET doit faire au moins 32 caractères"),
  PUBLIC_URL: z.string().url(),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  FRONT_URL: z.string().url().optional(),
  REVALIDATE_SECRET: z.string().optional(),
  UPLOAD_DIR: z.string().default("./uploads"),
  // 1 = Traefik seul ; 2 = Cloudflare + Traefik (sinon le rate-limit voit l'IP de Cloudflare)
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).default(1),
  ADMIN_EMAIL: z.string().email().optional().or(z.literal("")),
  ADMIN_PASSWORD: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("Variables d'environnement invalides :", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
export const corsOrigins = env.CORS_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean);
