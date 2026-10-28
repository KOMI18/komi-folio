import type { Metadata } from "next";
import { EventsList } from "@/components/site/events-list";
import { getEvents } from "@/lib/api";

export const metadata: Metadata = {
  title: "Events & hackathons",
  description: "Hackathons, compétitions et conférences tech auxquels Parfait Kom a participé au Cameroun.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <div className="container-page pt-36 md:pt-44">
      <header className="mb-12 max-w-3xl">
        <p className="eyebrow">Events</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance md:text-6xl">
          Mon parcours <span className="accent">compétitif</span>
        </h1>
        <p className="mt-5 text-lg text-muted">
          Hackathons, conférences et projets réalisés sous pression : mes expériences dans l&apos;écosystème tech.
        </p>
      </header>
      <EventsList events={events} />
    </div>
  );
}
