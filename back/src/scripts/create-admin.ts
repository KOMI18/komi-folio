// Usage : npm run admin:create -- email@exemple.com "mot de passe" "Nom"
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

const [email, password, name = "Admin"] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage : npm run admin:create -- <email> <mot de passe> ["Nom"]');
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);
await prisma.adminUser.upsert({
  where: { email: email.toLowerCase() },
  create: { email: email.toLowerCase(), name, passwordHash },
  update: { passwordHash, name },
});
console.log(`Admin ${email} prêt.`);
await prisma.$disconnect();
