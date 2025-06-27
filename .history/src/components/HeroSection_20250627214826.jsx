import { ArrowDown , Image } from "lucide-react";

export const HeroSection = () => {
  const logos = [
    { src: "/logo/project1.svg", alt: "Flutter" },
    { src: "/logo/project1.svg", alt: "React" },
    { src: "/logo/project1.svg", alt: "Node.js" },
    { src: "/logo/project1.png", alt: "JavaScript" },
    { src: "/logo/project1.png", alt: "HTML5" },
    { src: "/logo/project1.png", alt: "CSS3" },
    { src: "/logo/project1.png", alt: "MongoDB" },
    { src: "/logo/project1.png", alt: "MySQL" }
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
      <div className="overflow-hidden py-20 w-full relative">
      <div className="flex whitespace-nowrap animate-carousel">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className="w-20 h-20 flex items-center justify-center flex-shrink-0 mx-4">
            <img
              src={logo.src}
              alt={logo.alt}
              width={40}
              height={40}
              className="opacity-70 hover:opacity-100 transition"
            />
          </div>
        ))}
      </div>
    </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
  
};
