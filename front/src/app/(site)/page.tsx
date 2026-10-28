import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { ExperienceSection } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { LatestPosts } from "@/components/home/latest-posts";
import { ProjectsSection } from "@/components/home/projects";
import { Services } from "@/components/home/services";
import { SkillsGrid } from "@/components/home/skills";
import { SectionHeading } from "@/components/site/section-heading";
import { JsonLd } from "@/components/site/json-ld";
import { getPortfolio, getPosts } from "@/lib/api";
import { site } from "@/lib/site";

export default async function HomePage() {
  const [{ projects, experiences, skills, education }, posts] = await Promise.all([getPortfolio(), getPosts({ limit: 3 })]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          url: site.url,
          image: `${site.url}/projects/parfaitkom.jpeg`,
          jobTitle: "Développeur full-stack web & mobile",
          address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
          sameAs: Object.values(site.socials),
          knowsAbout: skills.map((s) => s.name),
        }}
      />
      <Hero stack={skills.filter((s) => s.showInHero)} />
      <About education={education} />
      <Services />
      <ExperienceSection experiences={experiences} />
      {skills.length > 0 && (
        <section id="skills" className="py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Compétences"
              title={
                <>
                  Stack <span className="accent">technique</span>
                </>
              }
              intro="Des années de pratique sur des projets réels. Pas de théorie, que du concret."
            />
            <SkillsGrid skills={skills} />
          </div>
        </section>
      )}
      <ProjectsSection projects={projects} />
      <LatestPosts posts={posts.items} />
      <Contact />
    </>
  );
}
