export const site = {
  name: "Parfait Kom",
  title: "Parfait Kom — Développeur full-stack web & mobile",
  description:
    "Développeur full-stack à Yaoundé : applications web et mobiles (Next.js, Flutter, Node.js), automatisation et IA. Blog, projets et retours d'expérience.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  apiUrl: (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/$/, ""),
  email: "tehemparfait@gmail.com",
  phone: "+237 695 511 268",
  phoneHref: "tel:+237695511268",
  location: "Yaoundé, Cameroun",
  cvUrl: "https://drive.google.com/file/d/1vqu8zBut85su2HLwEGOgPKf4M6IPL72U/view?usp=sharing",
  socials: {
    github: "https://github.com/KOMI18",
    linkedin: "https://www.linkedin.com/in/parfait-kom-a25925268/",
    x: "https://x.com/ParfaitKom",
    instagram: "https://www.instagram.com/parfait_tk/",
  },
};

export const nav = [
  { label: "À propos", href: "/#about" },
  { label: "Expérience", href: "/#experience" },
  { label: "Projets", href: "/#projects" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];
