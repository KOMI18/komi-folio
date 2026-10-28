import { env } from "./env.js";
import { app } from "./app.js";
import { prisma } from "./lib/prisma.js";
import { ensureAdmin } from "./lib/bootstrap.js";

await ensureAdmin();

const server = app.listen(env.PORT, () => {
  console.log(`API prête sur le port ${env.PORT}`);
});

const shutdown = () => {
  server.close(() => {
    prisma.$disconnect().finally(() => process.exit(0));
  });
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
