import { ArrowDown , Image } from "lucide-react";

export const HeroSection = () => {
  const logos = [
    { src: "/logo/flutter.svg", alt: "Flutter", color: "#02569B" },
    { src: "/logo/react.svg", alt: "React", color: "#61DAFB" },
    { src: "/logo/nodedotjs.svg", alt: "Node.js", color: "#339933" },
    { src: "/logo/javascript.svg", alt: "JavaScript", color: "#F7DF1E" },
    { src: "/logo/html5.svg", alt: "HTML5", color: "#E34F26" },
    { src: "/logo/css.svg", alt: "CSS3", color: "#1572B6" },
    { src: "/logo/mongodb.svg", alt: "MongoDB", color: "#47A248" },
    { src: "/logo/dart.svg", alt: "Dart", color: "#0175C2" },
    { src: "/logo/express.svg", alt: "Express", color: "#02569B" },
    { src: "/logo/github.svg", alt: "GitHub", color: "#181717" },
    { src: "/logo/gitlab.svg", alt: "GitLab", color: "#FC6D26" },
    { src: "/logo/mongoose.svg", alt: "Mongoose", color: "#800000" },
    { src: "/logo/nextdotjs.svg", alt: "Next.js", color: "#FF6C37" },
    { src: "/logo/notion.svg", alt: "Notion", color: "#000000" },
    { src: "/logo/postman.svg", alt: "Postman", color: "#FF6C37" },
    { src: "/logo/tailwindcss.svg", alt: "Tailwind", color: "#06B6D4" },
  ];
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Salut, je suis</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Parfait
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Kom
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
          Je transforme vos idées en applications  puissantes, prêtes à faire décoller votre business.
          PME, startups ou entrepreneurs : si vous cherchez quelqu’un qui livre vite et bien, vous êtes au bon endroit
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
             Voir mon travail
            </a>
          </div>
        </div>
      </div>
      <div className="overflow-hidden py-20w-full relative">
      <div className="carousel-track">
        <div className="flex gap-6 logos-row">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="w-20 h-20 flex items-center justify-center flex-shrink-0 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full shadow-sm"
              style={{ color: logo.color }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={40}
                height={40}
                style={{ filter: `drop-shadow(0 0 2px ${logo.color})` }}
                className="opacity-70 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>

        {/* duplicated row */}
        <div className="flex gap-6 logos-row" aria-hidden="true">
          {logos.map((logo, index) => (
            <div
              key={`clone-${index}`}
              className="w-20 h-20 flex items-center justify-center flex-shrink-0 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full shadow-sm"
              style={{ color: logo.color }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={40}
                height={40}
                style={{ filter: `drop-shadow(0 0 2px ${logo.color})` }}
                className="opacity-70 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
  
};
