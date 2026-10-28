// Reprend le contenu qui était codé en dur dans l'ancien portfolio Vite.
// Idempotent : chaque table n'est remplie que si elle est vide.
import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const projects: Prisma.ProjectCreateManyInput[] = [
  {
    title: "Geneo",
    description: "Plateforme pour créer l'arbre généalogique de votre famille de façon collaborative.",
    image: "/projects/geneo.png",
    tags: ["Next.js", "Tailwind CSS", "Firebase", "R2 storage"],
    demoUrl: "https://geneo.invity.site",
    featured: true,
  },
  {
    title: "Whaazz",
    description:
      "Déployez des assistants intelligents capables de vendre vos produits, d'enregistrer les commandes, de collecter et vérifier les paiements. Suivez toute votre activité commerciale grâce à un mini-logiciel de gestion intégré.",
    image: "/projects/whaazz-11.png",
    tags: ["Next.js", "Tailwind CSS", "Node.js", "n8n", "Firebase", "R2 storage"],
    demoUrl: "https://whaazz.invity.site",
    featured: true,
  },
  {
    title: "Invity",
    description:
      "SaaS d'invitations de mariage numériques : créez, personnalisez et envoyez vos invitations avec des QR codes uniques. Une expérience fluide, de l'invitation à l'entrée.",
    image: "/projects/invity.png",
    tags: ["React", "Tailwind CSS", "Node.js", "Better Auth", "Google People"],
    demoUrl: "https://invity.site",
    featured: true,
  },
  {
    title: "Flutter Starter",
    description:
      "Base de projet Flutter prête à l'emploi, pensée pour accélérer le démarrage et la productivité des développeurs.",
    image: "/projects/starter.png",
    tags: ["Flutter", "Dart"],
    githubUrl: "https://github.com/KOMI18/flutter_starter/tree/master",
  },
  {
    title: "Lokafy",
    description: "Gérez vos loyers et vos locataires de façon plus intelligente et transparente.",
    image: "/projects/lokafy.png",
    tags: ["Flutter", "GetX", "Firebase"],
  },
  {
    title: "Cosmopharmal Industry",
    description: "Plateforme pharmaceutique d'achat de concombre de mer au Canada.",
    image: "/projects/cosmo.png",
    tags: ["Next.js", "SQLite"],
    demoUrl: "https://www.cosmopharmalindustry.org",
  },
  {
    title: "Silia",
    description:
      "Une app Flutter pensée pour gérer des dépôts et transferts entre portefeuilles mobiles : contacts, historique, sécurité…",
    image: "/projects/silia.png",
    tags: ["Flutter", "Dart", "GetX", "Orange API", "MTN API"],
    githubUrl: "https://github.com/KOMI18/silia",
  },
  {
    title: "Speedara",
    description: "Application mobile d'expédition de colis au Cameroun.",
    image: "/projects/speedara1.png",
    tags: ["Flutter", "Dart", "GetX"],
    demoUrl: "https://theprogrammeragency.com/fr/project/category/sub/9d0e4ca7-6791-4406-ad48-1c402c8a4491",
  },
  {
    title: "Suite Sale",
    description:
      "PWA e-commerce dédiée aux commerçants de l'agroalimentaire local : gestion des produits, des ventes et des stocks, avec mise en avant du commerce de proximité.",
    image: "/projects/sale.png",
    tags: ["PHP", "Cordova", "Tailwind CSS", "SQL"],
    demoUrl: "https://cosmopharmalindustry.com/suitesale/app/Pages/Login.php",
  },
  {
    title: "Rizuk",
    description: "Plateforme de vente de produits pour l'alimentation des bébés : robot culinaire, chauffe-biberon.",
    image: "/projects/rizuk.png",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://rizuk.com/",
  },
  {
    title: "Suite Bar",
    description: "PWA dédiée à la gestion complète de snack-bars : ventes, stocks et personnel depuis votre téléphone.",
    image: "/projects/suite1.png",
    tags: ["PHP", "Cordova", "SQL", "Tailwind CSS"],
    demoUrl: "https://cosmopharmalindustry.com/bragherstudio.suite-ba/pages/user_login.php",
  },
  {
    title: "Auto Work",
    description:
      "Site vitrine haute performance pour un garage automobile, avec des animations fluides qui mettent en valeur les services et l'expertise mécanique.",
    image: "/projects/autocar.png",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://auto-car-repaire.vercel.app/",
    githubUrl: "https://github.com/KOMI18/auto-car-repaire",
  },
  {
    title: "Harmony Therapy",
    description:
      "Site web pour une thérapeute : design minimaliste et apaisant, optimisé pour une expérience utilisateur fluide.",
    image: "/projects/therapie.png",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://harmony-therapie.vercel.app/",
    githubUrl: "https://github.com/KOMI18/harmony-therapy",
  },
].map((p, order) => ({ ...p, order }));

const experiences: Prisma.ExperienceCreateManyInput[] = [
  {
    company: "Repeater",
    role: "Développeur Web",
    logo: "/logo/repeater.png",
    link: "https://repeater.edu.cm",
    location: "Hybride",
    description: "Intégré à une équipe agile, je développe des modules LMS pour la plateforme Repeater.",
    tags: ["Flutter", "React", "Agile"],
    color: "#e01d1d",
    startDate: new Date("2025-12-01"),
    endDate: new Date("2026-02-01"),
  },
  {
    company: "Yiel Group",
    role: "Développeur Backend Node.js",
    logo: "/logo/yiel.png",
    link: "https://yielgroup.com",
    location: "Remote",
    description:
      "Je travaille sur une application web SIRH (Système d'Information des Ressources Humaines), en concevant une architecture robuste et des API sûres pour la gestion du personnel.",
    tags: ["Node.js", "MongoDB", "REST API", "Sécurité"],
    color: "#ea5434",
    startDate: new Date("2024-10-01"),
    endDate: null,
  },
  {
    company: "The Programmer",
    role: "Développeur Flutter principal",
    logo: "/logo/the.png",
    link: "https://theprogrammeragency.com/fr",
    location: "Temps plein",
    description:
      "Développeur Flutter principal de Speedara, une plateforme d'expédition de colis avec deux applications : Speedara (client) et Speedara Pro (livreur). J'ai assuré la partie mobile et collaboré étroitement avec l'équipe backend.",
    tags: ["Flutter", "Firebase", "Maps API", "Temps réel"],
    color: "#8B5CF6",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2025-06-01"),
  },
  {
    company: "Menosi",
    role: "Développeur Flutter",
    logo: "/logo/menosi.jpeg",
    link: "https://menosi.net/",
    location: "Remote",
    description:
      "Développement de JappCare Auto, une application mobile qui connecte les utilisateurs aux garages automobiles à proximité : interfaces, géolocalisation, réservation et gestion des interventions.",
    tags: ["Flutter", "Réservation", "Géolocalisation", "Paiement"],
    color: "#F59E0B",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-03-01"),
  },
  {
    company: "Togettech",
    role: "Développeur Web & Mobile Flutter",
    logo: "/logo/togettech.jpeg",
    link: "https://www.linkedin.com/company/togettech-inc/",
    location: "Hybride",
    description:
      "Intégré à une équipe agile, j'ai développé des modules front et mobile pour des applications internes, corrigé des bugs critiques et assuré la stabilité des livrables.",
    tags: ["Flutter", "React", "Agile", "Debugging"],
    color: "#3B82F6",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2025-01-01"),
  },
].map((e, order) => ({ ...e, order }));

const skills: Prisma.SkillCreateManyInput[] = [
  ["Flutter", "FRONTEND", "/logo/flutter.svg", "Applications mobiles cross-platform iOS & Android", "2+ ans", "Intermédiaire", true],
  ["React", "FRONTEND", "/logo/react.svg", "Interfaces web modernes et applications SPA", "3+ ans", "Intermédiaire", true],
  ["Next.js", "FRONTEND", "/logo/nextdotjs.svg", "Applications web full-stack avec SSR", "2+ ans", "Intermédiaire", true],
  ["Tailwind CSS", "FRONTEND", "/logo/tailwindcss.svg", "Design system et UI responsive", "2+ ans", "Avancé", true],
  ["JavaScript", "FRONTEND", "/logo/javascript.svg", "ES6+, async/await, APIs modernes", "4+ ans", "Intermédiaire", true],
  ["Dart", "FRONTEND", "/logo/dart.svg", "Langage principal pour Flutter", "2+ ans", "Intermédiaire", true],
  ["Node.js", "BACKEND", "/logo/nodedotjs.svg", "APIs REST, microservices, serveurs temps réel", "3+ ans", "Intermédiaire", true],
  ["Express", "BACKEND", "/logo/express.svg", "Framework backend léger et performant", "3+ ans", "Intermédiaire", false],
  ["MongoDB", "BACKEND", "/logo/mongodb.svg", "Base de données NoSQL, agrégation, indexation", "2+ ans", "Intermédiaire", true],
  ["Mongoose", "BACKEND", "/logo/mongoose.svg", "ODM pour MongoDB, schémas et validation", "2+ ans", "Intermédiaire", false],
  ["Git / GitHub", "TOOLS", "/logo/github.svg", "Versioning, workflows, CI/CD, collaboration", "4+ ans", "Avancé", false],
  ["Postman", "TOOLS", "/logo/postman.svg", "Tests API, collections, automatisation", "3+ ans", "Expert", false],
  ["n8n", "TOOLS", "/logo/n8n.jpeg", "Automatisation, assistants IA", "1+ an", "Expert", true],
  ["Notion", "TOOLS", "/logo/notion.svg", "Documentation, planning, organisation", "2+ ans", "Avancé", false],
].map(([name, category, icon, description, experience, mastery, showInHero], order) => ({
  name: name as string,
  category: category as "FRONTEND" | "BACKEND" | "TOOLS",
  icon: icon as string,
  description: description as string,
  experience: experience as string,
  mastery: mastery as string,
  showInHero: showInHero as boolean,
  order,
}));

const education: Prisma.EducationCreateManyInput[] = [
  {
    title: "Licence professionnelle en Informatique",
    level: "Université",
    period: "2025",
    description: "Spécialisation en développement d'applications et systèmes.",
  },
  {
    title: "BTS",
    level: "Université",
    period: "2022 – 2024",
    description: "Brevet de Technicien Supérieur : première immersion dans le développement et les technologies.",
  },
  {
    title: "Baccalauréat",
    level: "Secondaire",
    period: "2022",
    description: "Diplôme du secondaire : ouverture vers l'enseignement supérieur et la spécialisation technique.",
  },
].map((e, order) => ({ ...e, order }));

const events: Prisma.EventCreateManyInput[] = [
  {
    title: "Cameroon International Tech Summit",
    type: "HACKATHON" as const,
    date: "2024",
    location: "Yaoundé, Cameroun",
    project: "Mints",
    url: "https://mints-beryl.vercel.app/",
    attendees: "250+",
    teamSize: 5,
    tech: ["React", "Node.js", "Google Maps API"],
    description:
      "Application web permettant aux ONG humanitaires de cibler les zones en manque d'eau potable et d'intervenir plus efficacement.",
    image: "/projects/summit.jpeg",
  },
  {
    title: "Yaoundé City Hack",
    type: "HACKATHON" as const,
    date: "2024",
    location: "Yaoundé, Cameroun",
    project: "Aviato",
    attendees: "100+",
    teamSize: 4,
    tech: ["React", "TypeScript", "Node.js"],
    description:
      "Plateforme centralisant les offres d'emploi et les formations, avec des recommandations d'entreprises et d'offres pour chaque utilisateur.",
    image: "/projects/city.jpeg",
  },
  {
    title: "Prix d'Excellence Zacharias Tanee",
    type: "COMPETITION" as const,
    date: "2024",
    location: "Yaoundé, Cameroun",
    position: "Top 15",
    project: "EduTrack — système de gestion scolaire intelligent",
    teamSize: 5,
    tech: ["React", "Node.js", "MongoDB"],
    description:
      "Plateforme de gestion scolaire avec suivi en temps réel des performances, communication parents-professeurs et gestion administrative.",
  },
  {
    title: "La face cachée des réseaux sociaux",
    type: "CONFERENCE" as const,
    date: "2022",
    location: "Yaoundé, Cameroun",
    description: "Pair éducateur dans la promotion de l'utilisation citoyenne des réseaux sociaux.",
    image: "/projects/certificat.jpg",
  },
  {
    title: "DevFest Yaoundé 2025",
    type: "CONFERENCE" as const,
    date: "2025",
    location: "Yaoundé, Cameroun",
    position: "Participant",
    tech: ["Flutter", "IA", "Marketing"],
    description:
      "Le DevFest rassemble chaque année des centaines de développeurs, passionnés de technologie et innovateurs autour d'une journée riche en apprentissage.",
    image: "/projects/devfest.jpeg",
  },
].map((e, order) => ({ ...e, order }));

const welcomePost = `Bienvenue sur mon blog 👋

Ici je partage ce que j'apprends en construisant des produits : **Flutter**, **Node.js**, **Next.js**, l'automatisation avec **n8n**, et les coulisses de mes projets SaaS.

## Ce que vous trouverez ici

- Des tutoriels techniques détaillés
- Des retours d'expérience sur mes projets
- Des best practices et des extraits de code
- Des analyses d'outils et de frameworks

\`\`\`ts
const blog = { auteur: "Parfait Kom", sujets: ["dev", "produit", "freelance"] };
\`\`\`

Abonnez-vous à la newsletter pour ne rien manquer.
`;

async function seedIfEmpty(name: string, count: () => Promise<number>, insert: () => Promise<unknown>) {
  if ((await count()) > 0) return console.log(`· ${name} : déjà rempli, ignoré`);
  await insert();
  console.log(`✓ ${name}`);
}

await seedIfEmpty("projets", () => prisma.project.count(), () => prisma.project.createMany({ data: projects }));
await seedIfEmpty("expériences", () => prisma.experience.count(), () => prisma.experience.createMany({ data: experiences }));
await seedIfEmpty("compétences", () => prisma.skill.count(), () => prisma.skill.createMany({ data: skills }));
await seedIfEmpty("formation", () => prisma.education.count(), () => prisma.education.createMany({ data: education }));
await seedIfEmpty("événements", () => prisma.event.count(), () => prisma.event.createMany({ data: events }));
await seedIfEmpty("articles", () => prisma.post.count(), () =>
  prisma.post.create({
    data: {
      slug: "bienvenue-sur-mon-blog",
      title: "Bienvenue sur mon blog",
      excerpt: "Pourquoi je lance ce blog et ce que vous allez y trouver : dev web & mobile, produit, automatisation.",
      content: welcomePost,
      tags: ["annonce"],
      status: "DRAFT",
      readingMinutes: 1,
    },
  }),
);

await prisma.$disconnect();
