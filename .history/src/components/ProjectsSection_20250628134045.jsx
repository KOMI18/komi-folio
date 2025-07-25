import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [

  {
    id: 2,
    title: "Flutter Stater",
    description:
      "Base de projet Flutter prête à l’emploi, pensée pour accélérer le démarrage et la productivité des développeurs",
    image: "/projects/starter.png",
    tags: ["Flutter", "Dart"],
    demoUrl: "#",
    githubUrl: "https://github.com/KOMI18/flutter_starter/tree/master",
  },
  {
    id: 2,
    title: "Silia",
    description:
      "Une app Flutter pensée pour gérer des dépôts et transferts entre portefeuilles mobiles. Gestion de contacts, historique, sécurité…",
    image: "/projects/silia.png",
    tags: ["Flutter", "Dart", "GetX" , "Orange API"],
    // demoUrl: "#",
    githubUrl: "https://github.com/KOMI18/silia",
  },
  {
    id: 3,
    title: "Speedara",
    description:
      "Une application mobile d'expedition de colis au cameroun",
    image: "/projects/speedara.jpeg",
    tags: ["Flutter", "Dart", "GetX" ],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Suite Sale",
    description:
      "Plateforme e-commerce PWA, dédiée aux commerçants de l’agroalimentaire local : gestion des produits, des ventes et des stocks, avec mise en avant du commerce de proximité.",
    image: "/projects/sale.png",
    tags: ["PHP", "Cordova" , "Tailwind CSS" , "SQL"],
    demoUrl: "#",
    githubUrl: "https://cosmopharmalindustry.com/suitesale/app/Pages/Login.php",
  },
  {
    id: 1,
    title: "Suite Bar ",
    description:
      "PWA (progressive web app) dédiée à la gestion complète de snack-bars : ventes, stocks et personnel depuis votre telephone mobile",
    image: "/projects/suite.png",
    tags: ["PHP", "Cordova" , "SQL", "Tailwind CSS"],
    demoUrl: "https://cosmopharmalindustry.com/bragherstudio.suite-ba/pages/user_login.php",
    githubUrl: "#",
  },
  
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Quelques <span className="text-primary">Projets</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Ce que j’ai construit pour d’autres, je peux le construire pour vous. 
          {" "}
          Des projets concrets, pas des promesses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="skillgroup bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-70 overflow-hidden">
                <img
                height={400}
                width={500}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/KOMI18"
          >
             Mon Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
