import { ArrowUpRight } from "lucide-react";
export const ExperienceSection = () => {
    const experiences = [
      {
        id: "01",
        company: "TOGETTECH",
        period: "2022 → 2025",
        role: "Développeur Web & Mobile Flutter",
        link: "https://www.linkedin.com/company/technosplus/",
        description:
          "Intégré à une équipe agile, j’ai développé des modules front et mobile pour des applications internes. J’ai apporté des solutions concrètes sur des bugs critiques et assuré la stabilité des livrables."
      },
      {
        id: "02",
        company: "The Programmer",
        period: "Aaout 2024 → Juin 2025",
        role: "Développeur  Flutter",
        link: "https://www.linkedin.com/company/technosplus/",
        description: "J’ai Developpé des modules front et mobile pour des applications internes. J’ai apporté des solutions concrètes sur des bugs critiques et assuré la stabilité des livrables."
      },
      {
        id: "03",
        company: "Yiel Group",
        period: " oct 2024 → 2025",
        link: "https://www.linkedin.com/company/technosplus/",
        role: "Développeur Indépendant",
        description:
          "J’ai géré de bout en bout des applis, des sites vitrines et des tests techniques. Chaque client m’a appris à mieux structurer, mieux communiquer et mieux livrer."
      },
      {
        id: "03",
        company: "MENOSI",
        period: " oct 2024 → 2025",
        link: "https://www.linkedin.com/company/technosplus/",
        role: "Développeur Indépendant",
        description:
          "J’ai géré de bout en bout des applis, des sites vitrines et des tests techniques. Chaque client m’a appris à mieux structurer, mieux communiquer et mieux livrer."
      }
    ];
  
    return (
        <section id="experience" className="py-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-left">
            Mon parcours, une étape à la fois
          </h2>
          <div className="relative border-l-4 border-primary pl-6">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="mb-12 relative">
                <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
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