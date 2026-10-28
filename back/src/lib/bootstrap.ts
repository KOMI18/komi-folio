import bcrypt from "bcryptjs";
import { env } from "../env.js";
import { prisma } from "./prisma.js";

// Crée le premier compte admin à partir des variables d'env, uniquement si la table est vide
export async function ensureAdmin(): Promise<void> {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return;
  if ((await prisma.adminUser.count()) > 0) return;
  await prisma.adminUser.create({
    data: {
      email: env.ADMIN_EMAIL.toLowerCase(),
      name: "Parfait Kom",
      passwordHash: await bcrypt.hash(env.ADMIN_PASSWORD, 12),
    },
  });
  console.log(`Compte admin créé : ${env.ADMIN_EMAIL}`);
}
