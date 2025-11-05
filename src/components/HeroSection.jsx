
import { ArrowDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const rotatingWords = [
    "scalables",
    "rentables",
    "modernes"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const logos = [
    { src: "/logo/react.svg", alt: "React", color: "#61DAFB" },
    { src: "/logo/nextdotjs.svg", alt: "Next.js", color: "#FF6C37" },
    { src: "/logo/flutter.svg", alt: "Flutter", color: "#02569B" },
    { src: "/logo/nodedotjs.svg", alt: "Node.js", color: "#339933" },
    { src: "/logo/mongodb.svg", alt: "MongoDB", color: "#47A248" },
    { src: "/logo/tailwindcss.svg", alt: "Tailwind", color: "#06B6D4" },
    { src: "/logo/javascript.svg", alt: "JavaScript", color: "#F7DF1E" },
    { src: "/logo/dart.svg", alt: "Dart", color: "#0175C2" },
  ];

  return (
    <section
      id="hero"
      className="relative mt-20 min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 animate-pulse" style={{ animationDuration: '4s' }} />
      
      <div className="container max-w-5xl mx-auto text-center z-10">
        <div className="space-y-8">
          {/* Badge */}
         
      
          {/* Main headline with rotating word */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight  animate-fade-in">
              Je construis des applications{" "}
              <span className="inline-block min-w-[280px] md:min-w-[400px] text-left">
                <span 
                  key={activeIndex}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary animate-word-fade"
                >
                  {rotatingWords[activeIndex]}
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-2 leading-relaxed">
              Mobile, web, backend  je gère tout de A à Z pour que vous puissiez vous concentrer sur votre business. 
              <span className="block mt-2 font-medium text-foreground">Rapidité. Qualité. Résultats.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 opacity-0 animate-fade-in-delay-3">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50"
            >
              Voir mes réalisations
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-primary/30 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Discutons de votre projet
            </a>
          </div>
        </div>
      </div>

      {/* Tech Stack - Modern Grid Display */}
      <div className="mt-20 w-full max-w-4xl mx-auto opacity-0 animate-fade-in-delay-4">
        <p className="text-center text-sm text-muted-foreground mb-6 font-medium tracking-wide uppercase">
          Stack technique
        </p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
                  {logos.map((logo, index) => (
             <div
               key={index}
               className="group relative aspect-square flex items-center justify-center  rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg"
               style={{ 
                 animationDelay: `${index * 100}ms`,
                 boxShadow: `0 0 20px ${logo.color}15`
               }}
             >
               <img
                 src={logo.src}
                 alt={logo.alt}
                
                 className="w-8 h-8 md:w-10 md:h-10  group-hover:opacity-100 transition-opacity duration-300"
                 style={{ 
                   filter: `drop-shadow(0 0 8px ${logo.color})` 
                 }}
               />
               <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 {logo.alt}
               </span>
             </div>
           ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes word-fade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.6s ease-out 0.2s forwards;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.4s forwards;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.6s ease-out 0.6s forwards;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.6s ease-out 0.8s forwards;
        }

        .animate-word-fade {
          animation: word-fade 2.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;