import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED = new Set(["posts", "projects", "experiences", "skills", "education", "events"]);

// Appelé par le backend après chaque modification dans l'admin
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { tags } = (await req.json().catch(() => ({}))) as { tags?: string[] };
  const valid = (tags ?? []).filter((t) => ALLOWED.has(t));
  // expire: 0 → la prochaine visite reçoit directement le contenu à jour
  for (const tag of valid) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: valid });
}
