# komi-folio

Portfolio et blog de Parfait Kom — [komi.invity.site](https://komi.invity.site)

| Dossier  | Stack                                   | Hébergement                                     |
| -------- | --------------------------------------- | ----------------------------------------------- |
| `front/` | Next.js 16 (App Router, Cache Components), Tailwind 4 | Vercel (Root Directory = `front`)  |
| `back/`  | Node.js 22, Express 5, TypeScript, Prisma, Postgres   | Dokploy, projet « Komi Folio » → `komi-api.invity.site` |

Tout le contenu (articles, projets, expériences, compétences, formation, events) se gère depuis **`/admin`**.

## Développement local

```bash
# Base de données
docker run -d --name komi-pg -e POSTGRES_USER=komi -e POSTGRES_PASSWORD=komi -e POSTGRES_DB=komi_folio -p 5433:5432 postgres:16-alpine

# API (http://localhost:4000)
cd back
cp .env.example .env          # renseigner JWT_SECRET et ADMIN_PASSWORD
npm install
npx prisma migrate dev        # crée les tables
npm run db:seed               # reprend le contenu de l'ancien portfolio
npm run dev

# Site (http://localhost:3000)
cd front
cp .env.example .env.local
npm install
npm run dev
```

Le compte admin est créé au démarrage de l'API à partir de `ADMIN_EMAIL` / `ADMIN_PASSWORD` s'il n'en existe aucun.
Pour en ajouter ou changer un mot de passe : `npm run admin:create -- email "mot de passe" "Nom"`.

## Comment le contenu se met à jour

Les pages publiques sont pré-rendues et mises en cache (`"use cache"` + `cacheTag`). Après chaque modification
dans l'admin, l'API appelle `POST {FRONT_URL}/api/revalidate` avec `REVALIDATE_SECRET` : la visite suivante
reçoit le contenu à jour, sans redéploiement.

## Base de données

Modifier `back/prisma/schema.prisma`, puis `npx prisma migrate dev --name <nom>` et committer le dossier
`prisma/migrations`. Les migrations sont appliquées automatiquement au démarrage du conteneur
(`prisma migrate deploy`), suivies du seed (qui ne remplit que les tables vides).

## CI/CD

- **GitHub Actions** (`.github/workflows/ci.yml`) : typecheck, build, migrations et smoke test de l'API ; lint et build du front.
- **Dokploy** redéploie `back/` à chaque push sur `main` qui touche `back/**`.
- **Vercel** redéploie `front/` à chaque push (preview sur les branches, production sur `main`).

## Variables d'environnement

- `back/.env.example` : API (Dokploy → komi-back → Environment)
- `front/.env.example` : site (Vercel → Settings → Environment Variables)
