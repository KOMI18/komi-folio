# Miroir public AWS — évite les timeouts auth.docker.io depuis certains VPS
FROM public.ecr.aws/docker/library/node:22-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build && npm prune --omit=dev && npx prisma generate

FROM public.ecr.aws/docker/library/node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
ENV UPLOAD_DIR=/app/uploads
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./
RUN mkdir -p /app/uploads && chown -R node:node /app
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s CMD node -e "fetch('http://localhost:4000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
# Migrations + seed idempotent (ne remplit que les tables vides), puis démarrage
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy && node dist/scripts/seed.js && node dist/server.js"]
