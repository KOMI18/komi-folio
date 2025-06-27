import { ArrowUpRight } from "lucide-react";
export const ExperienceSection = () => {
    const experiences = [
      {
        id: "01",
        company: "TOGETTECH",
        period: "2022 → 2025",
        role: "Développeur Web & Mobile Flutter",
        link: "https://www.linkedin.com/company/togettech-inc/posts/?feedView=all",
        description:
          "Intégré à une équipe agile, j’ai développé des modules front et mobile pour des applications internes. J’ai apporté des solutions concrètes sur des bugs critiques et assuré la stabilité des livrables."
      },
      {
        id: "02",
        company: "The Programmer",
        period: "Août 2024 → Juin 2025",
        role: "Développeur Flutter",
        link: "https://theprogrammeragency.com/fr",
        description:
          "J'ai conçu  Speedara, une plateforme d'expédition de colis avec deux applications : Speedara (client) et Speedara Pro (livreur). Une solution fluide et rapide pour la logistique urbaine."
      },
      {
        id: "03",
        company: "Yiel Group",
        period: "Oct 2024 → 2025",
        role: "Développeur Backend NodeJs",
        link: "https://www.linkedin.com/in/yiel-group-915729351/",
        description:
          "Je travaille sur une application web SIRH (Système d'Information des Ressources Humaines), en concevant une architecture robuste et des API sûres pour la gestion du personnel."
      },
      {
        id: "04",
        company: "MENOSI",
        period: "Oct 2024 → 2025",
        role: "Développeur Flutter",
        link: "https://menosi.net/",
        description:
          "J'ai développé JappCare Auto, une application mobile qui connecte les utilisateurs à des garages automobiles proches. Réservation en ligne, gestion de planning et intervention rapide des garagistes."
      }
    ];
  
    return (
        <section id="experience" className="py-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 py text-center">
          {" "}
          Mon <span className="text-primary">experience</span> , une étape à la fois
        </h2>
          <div className="relative border-l-4 border-primary pl-6">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="mb-12 relative">
                <div className="absolute -left-11 top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {exp.id}
                </div>
                <div className="ml-6 text-left">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span>{exp.company}</span>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </h3>
                  <p className="text-muted-foreground text-sm mb-1">{exp.period}</p>
                  <p className="text-base font-medium">{exp.role}</p>
                  <p className="text-muted-foreground mt-2">{exp.description}</p>
                </div>
                {index !== experiences.length - 1 && (
                  <div className="absolute left-0 top-full h-12 w-0.5 bg-primary"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ExperienceSection;  