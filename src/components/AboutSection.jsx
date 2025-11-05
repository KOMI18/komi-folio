import { ArrowRight, GraduationCap, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export const AboutSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in-observe");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const timeline = [
    {
      year: "Maternelle - Primaire",
      period: "2008-2015",
      title: "CEP",
      description: "Certificat d'Études Primaires - Premières bases en lecture, mathématiques et découverte du monde.",
      color: "#3B82F6"
    },
    {
      year: "Secondaire",
      period: "2019",
      title: "BEPC",
      description: "Brevet d'Études du Premier Cycle - Consolidation des acquis fondamentaux et orientation vers le second cycle.",
      color: "#8B5CF6"
    },
    {
      year: "Secondaire",
      period: "2021",
      title: "Probatoire",
      description: "Épreuve anticipée du baccalauréat - Validation des connaissances de première année.",
      color: "#EC4899"
    },
    {
      year: "Secondaire",
      period: "2022",
      title: "Baccalauréat",
      description: "Diplôme du secondaire - Ouverture vers l'enseignement supérieur et spécialisation technique.",
      color: "#F59E0B"
    },
    {
      year: "Université",
      period: "2022-2024",
      title: "BTS",
      description: "Brevet de Technicien Supérieur - Première immersion dans le développement et les technologies.",
      color: "#10B981"
    },
    {
      year: "Université",
      period: "2025",
      title: "Licence",
      description: "Licence professionnelle en Informatique - Spécialisation en développement d'applications et systèmes.",
      color: "#06B6D4"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 fade-in-observe opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Du <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">parcours</span> aux résultats
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un chemin construit sur la persévérance, l'apprentissage continu et la passion du code.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: Image & Intro */}
          <div className="fade-in-observe opacity-0 space-y-6">
            <div className="relative group">
              <div className="w-full aspect-square max-w-md mx-auto relative overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-primary/20">
                <img
                  src="/projects/parfaitkom.jpeg"
                  alt="Parfait Kom"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            <div className="space-y-4 text-left">
              <h3 className="text-2xl md:text-3xl font-bold">
                Parfait Kom
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Développeur full-stack passionné, je transforme des idées en applications concrètes qui génèrent de la valeur. 
                Mobile, web, backend  je maîtrise toute la chaîne de production pour livrer des solutions qui fonctionnent.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mon approche ? Efficacité, transparence, et résultats mesurables. 
                Zéro bullshit, du code propre, et un engagement à 100% sur chaque projet.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#contact" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50 inline-flex items-center gap-2">
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1vqu8zBut85su2HLwEGOgPKf4M6IPL72U/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-primary/30 rounded-lg font-semibold hover:bg-primary/5 transition-colors inline-flex items-center gap-2"
                >
                  Mon CV
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="fade-in-observe opacity-0">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h3 className="text-2xl md:text-3xl font-bold">Parcours académique</h3>
            </div>

            <div className="relative pl-8 space-y-6">
              {/* Timeline vertical line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary/20" />

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute -left-8 top-2 w-6 h-6 rounded-full border-4 border-background transition-all duration-300"
                    style={{ 
                      backgroundColor: hoveredIndex === index ? item.color : '#666',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${item.color}80` : 'none',
                      transform: hoveredIndex === index ? 'scale(1.3)' : 'scale(1)'
                    }}
                  />

                  {/* Content card */}
                  <div 
                    className="p-5 rounded-xl border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                    style={{
                      borderColor: hoveredIndex === index ? item.color : 'rgba(255,255,255,0.1)',
                      boxShadow: hoveredIndex === index ? `0 8px 30px ${item.color}30` : 'none',
                      transform: hoveredIndex === index ? 'translateX(8px)' : 'translateX(0)'
                    }}
                  >
                    <div className="flex text-left items-start justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-bold mb-1" style={{ color: hoveredIndex === index ? item.color : 'inherit' }}>
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {item.period}
                        </p>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {item.year}
                      </span>
                    </div>

                    {/* Description on hover */}
                    <div 
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: hoveredIndex === index ? '200px' : '0',
                        opacity: hoveredIndex === index ? 1 : 0
                      }}
                    >
                      <p className="text-sm text-left text-muted-foreground pt-3 border-t border-white/10 mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar (optional) */}
        <div className="fade-in-observe opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10">
          {[
            { value: "3", label: "Ans d'expérience" },
            { value: "10+", label: "Projets livrés" },
            { value: "5+", label: "Clients satisfaits" },
            { value: "100%", label: "Engagement" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;