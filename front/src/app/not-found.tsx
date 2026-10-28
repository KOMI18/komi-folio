import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="eyebrow">Erreur 404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Page <span className="accent">introuvable</span>
        </h1>
        <p className="mt-4 text-muted">Cette page n&apos;existe pas ou a été déplacée.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            Accueil
          </Link>
          <Link href="/blog" className="btn-ghost">
            Le blog
          </Link>
        </div>
      </div>
    </main>
  );
}
