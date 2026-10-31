export type PostStatus = "DRAFT" | "PUBLISHED";

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  tags: string[];
  featured: boolean;
  readingMinutes: number;
  publishedAt: string | null;
  updatedAt: string;
}

export interface Post extends PostSummary {
  content: string;
  status: PostStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  views: number;
  createdAt: string;
  // Renseignés uniquement par l'API admin
  audioStatus?: AudioStatus;
  audioUrl?: string | null;
  audioError?: string | null;
}

export type AudioStatus = "NONE" | "PENDING" | "READY" | "FAILED";

// Une ligne du mode écoute ; start/end (secondes) présents quand l'audio Kokoro est disponible
export interface SpeechSegment {
  kind: "heading" | "text" | "quote" | "item" | "note";
  text: string;
  speak?: string;
  start?: number;
  end?: number;
}

export interface PostSpeech {
  segments: SpeechSegment[];
  audio: { url: string; duration: number } | null;
}

export interface PostDetail extends Post {
  related: PostSummary[];
  speech?: PostSpeech;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  logo: string | null;
  link: string | null;
  location: string | null;
  description: string;
  tags: string[];
  color: string;
  startDate: string;
  endDate: string | null;
  visible: boolean;
  order: number;
}

export type SkillCategory = "FRONTEND" | "BACKEND" | "TOOLS";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string | null;
  description: string | null;
  experience: string | null;
  mastery: string | null;
  showInHero: boolean;
  visible: boolean;
  order: number;
}

export interface Education {
  id: string;
  title: string;
  level: string;
  period: string;
  description: string;
  visible: boolean;
  order: number;
}

export type EventType = "HACKATHON" | "COMPETITION" | "CONFERENCE";

export interface EventItem {
  id: string;
  title: string;
  type: EventType;
  date: string;
  location: string | null;
  position: string | null;
  project: string | null;
  url: string | null;
  attendees: string | null;
  teamSize: number | null;
  tech: string[];
  achievements: string[];
  description: string;
  image: string | null;
  isWinner: boolean;
  visible: boolean;
  order: number;
}

export interface Portfolio {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  education: Education[];
}

export interface Tag {
  name: string;
  count: number;
}
