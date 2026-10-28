"use client";

import type { ResourceConfig } from "./resource-manager";
import { formatPeriod } from "@/lib/utils";

const str = (v: unknown) => (v == null ? "" : String(v));

export const projectsConfig: ResourceConfig = {
  title: "Projets",
  description: "Les projets affichés sur la page d'accueil. « Mis en avant » = grande carte.",
  endpoint: "projects",
  singular: "Projet",
  defaults: { title: "", description: "", image: null, tags: [], demoUrl: "", githubUrl: "", featured: false, visible: true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true, full: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "image", label: "Image", type: "image" },
    { name: "tags", label: "Technologies", type: "tags" },
    { name: "demoUrl", label: "URL de démo", type: "url", full: true },
    { name: "githubUrl", label: "URL GitHub", type: "url", full: true },
    { name: "featured", label: "Mis en avant", type: "boolean" },
    { name: "visible", label: "Visible", type: "boolean" },
  ],
  render: (p) => ({ title: str(p.title), subtitle: (p.tags as string[]).join(" · "), image: p.image as string | null }),
};

export const experiencesConfig: ResourceConfig = {
  title: "Expériences",
  description: "Le parcours professionnel. Laisser la date de fin vide = poste actuel.",
  endpoint: "experiences",
  singular: "Expérience",
  defaults: { company: "", role: "", logo: null, link: "", location: "", description: "", tags: [], color: "#7c6cf0", startDate: "", endDate: "", visible: true },
  fields: [
    { name: "role", label: "Poste", type: "text", required: true },
    { name: "company", label: "Entreprise", type: "text", required: true },
    { name: "startDate", label: "Début", type: "date", required: true },
    { name: "endDate", label: "Fin", type: "date" },
    { name: "location", label: "Lieu / mode", type: "text" },
    { name: "color", label: "Couleur", type: "color" },
    { name: "link", label: "Site de l'entreprise", type: "url", full: true },
    { name: "logo", label: "Logo", type: "image" },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "tags", label: "Technologies", type: "tags" },
    { name: "visible", label: "Visible", type: "boolean" },
  ],
  render: (e) => ({
    title: `${str(e.role)} — ${str(e.company)}`,
    subtitle: formatPeriod(str(e.startDate), (e.endDate as string | null) ?? null),
    image: e.logo as string | null,
  }),
};

export const skillsConfig: ResourceConfig = {
  title: "Compétences",
  description: "« Dans le hero » = affichée dans le bandeau défilant en haut de la page d'accueil.",
  endpoint: "skills",
  singular: "Compétence",
  defaults: { name: "", category: "FRONTEND", icon: null, description: "", experience: "", mastery: "", showInHero: false, visible: true },
  fields: [
    { name: "name", label: "Nom", type: "text", required: true },
    {
      name: "category",
      label: "Catégorie",
      type: "select",
      options: [
        { value: "FRONTEND", label: "Front & mobile" },
        { value: "BACKEND", label: "Backend & data" },
        { value: "TOOLS", label: "Outils & DevOps" },
      ],
    },
    { name: "experience", label: "Expérience", type: "text", hint: "ex. 3+ ans" },
    { name: "mastery", label: "Niveau", type: "text", hint: "ex. Avancé" },
    { name: "description", label: "Description", type: "textarea", rows: 2 },
    { name: "icon", label: "Icône", type: "image" },
    { name: "showInHero", label: "Dans le hero", type: "boolean" },
    { name: "visible", label: "Visible", type: "boolean" },
  ],
  render: (s) => ({ title: str(s.name), subtitle: [s.category, s.experience, s.mastery].filter(Boolean).join(" · "), image: s.icon as string | null }),
};

export const educationConfig: ResourceConfig = {
  title: "Formation",
  endpoint: "education",
  singular: "Diplôme",
  defaults: { title: "", level: "", period: "", description: "", visible: true },
  fields: [
    { name: "title", label: "Diplôme", type: "text", required: true, full: true },
    { name: "level", label: "Niveau", type: "text", hint: "ex. Université" },
    { name: "period", label: "Période", type: "text", hint: "ex. 2022 – 2024" },
    { name: "description", label: "Description", type: "textarea", required: true, rows: 3 },
    { name: "visible", label: "Visible", type: "boolean" },
  ],
  render: (e) => ({ title: str(e.title), subtitle: `${str(e.level)} · ${str(e.period)}` }),
};

export const eventsConfig: ResourceConfig = {
  title: "Events & hackathons",
  endpoint: "events",
  singular: "Event",
  defaults: {
    title: "",
    type: "HACKATHON",
    date: "",
    location: "",
    position: "",
    project: "",
    url: "",
    attendees: "",
    teamSize: null,
    tech: [],
    achievements: [],
    description: "",
    image: null,
    isWinner: false,
    visible: true,
  },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true, full: true },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "HACKATHON", label: "Hackathon" },
        { value: "COMPETITION", label: "Compétition" },
        { value: "CONFERENCE", label: "Conférence" },
      ],
    },
    { name: "date", label: "Date", type: "text", required: true, hint: "ex. Mars 2025" },
    { name: "location", label: "Lieu", type: "text" },
    { name: "position", label: "Classement / rôle", type: "text" },
    { name: "project", label: "Projet réalisé", type: "text" },
    { name: "teamSize", label: "Taille de l'équipe", type: "number" },
    { name: "attendees", label: "Participants", type: "text" },
    { name: "url", label: "Lien du projet", type: "url", full: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "image", label: "Image", type: "image" },
    { name: "tech", label: "Technologies", type: "tags" },
    { name: "achievements", label: "Distinctions", type: "tags" },
    { name: "isWinner", label: "Lauréat", type: "boolean" },
    { name: "visible", label: "Visible", type: "boolean" },
  ],
  render: (e) => ({ title: str(e.title), subtitle: `${str(e.type)} · ${str(e.date)}`, image: e.image as string | null }),
};
