import { useEffect, useState } from "react";
import { ArrowUpRight, Calendar, MapPin, ExternalLink } from "lucide-react";

export const ExperienceSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const experiences = [
    {
      id: "togettech",
      company: "TOGETTECH",
      logo: "/logo/togettech.jpeg", // Remplace par le vrai chemin
      logoFallback: "TT",
      period: "2022 → 2025",
      duration: "3 ans",
      location: "Hybrid",
      role: "Développeur Web & Mobile Flutter",
      link: "https://www.linkedin.com/company/togettech-inc/posts/?feedView=all",
      description: "Intégré à une équipe agile, j'ai développé des modules front et mobile pour des applications internes. J'ai apporté des solutions concrètes sur des bugs critiques et assuré la stabilité des livrables.",
      tags: ["Flutter", "React", "Agile", "Debugging"],
      color: "#3B82F6",
      isActive: true
    },
    {
      id: "programmer",
      company: "The Programmer",
      logo: "/logo/the.png",
      logoFallback: "TP",
      period: "Août 2024 → Juin 2025",
      duration: "10 mois",
      location: "Temps plein",
      role: "Développeur Flutter",
      link: "https://theprogrammeragency.com/fr",
      description: "J'ai conçu Speedara, une plateforme d'expédition de colis avec deux applications : Speedara (client) et Speedara Pro (livreur). Une solution fluide et rapide pour la logistique urbaine.",
      tags: ["Flutter", "Firebase", "Maps API", "Real-time"],
      color: "#8B5CF6",
      isActive: false
    },
    {
      id: "yiel",
      company: "Yiel Group",
      logo: "/logo/yiel.png",
      logoFallback: "YG",
      period: "Oct 2024 → 2025",
      duration: "En cours",
      location: "Remote",
      role: "Développeur Backend NodeJs",
      link: "https://www.linkedin.com/in/yiel-group-915729351/",
      description: "Je travaille sur une application web SIRH (Système d'Information des Ressources Humaines), en concevant une architecture robuste et des API sûres pour la gestion du personnel.",
      tags: ["Node.js", "MongoDB", "REST API", "Security"],
      color: "#ea5434",
      isActive: true
    },
    {
      id: "menosi",
      company: "MENOSI",
      logo: "/logo/menosi.jpeg",
      logoFallback: "ME",
      period: "Oct 2024 → 2025",
      duration: "En cours",
      location: "Remote",
      role: "Développeur Flutter",
      link: "https://menosi.net/",
      description: "J'ai développé JappCare Auto, une application mobile qui connecte les utilisateurs à des garages automobiles proches. Réservation en ligne, gestion de planning et intervention rapide des garagistes.",
      tags: ["Flutter", "Booking System", "Geolocation", "Payment"],
      color: "#F59E0B",
      isActive: false
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll(".experience-item");
    items.forEach((item, i) => {
      item.style.animationDelay = `${i * 150}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-24 px-4 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Parcours <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">professionnel</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des missions concrètes, des résultats mesurables, et des collaborations enrichissantes avec des équipes ambitieuses.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - Hidden on mobile */}
          <div className="hidden md:block absolute left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary/20" />

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="experience-item opacity-0 relative"
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Content card - Full width on mobile */}
                <div 
                  className="md:ml-32 p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm bg-background/50"
                  style={{
                    borderColor: hoveredId === exp.id ? exp.color : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: hoveredId === exp.id ? `0 8px 30px ${exp.color}20` : 'none',
                    transform: hoveredId === exp.id ? 'translateX(8px)' : 'translateX(0)'
                  }}
                >
                  {/* Logo - Top on mobile, absolute on desktop */}
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <div 
                      className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 md:absolute md:-left-24 md:top-6 rounded-xl flex items-center justify-center transition-all duration-300 border-4 border-background overflow-hidden"
                      style={{
                        backgroundColor: exp.color + '20',
                        boxShadow: hoveredId === exp.id ? `0 0 30px ${exp.color}60` : 'none',
                        transform: hoveredId === exp.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                      }}
                    >
                      {/* Fallback si pas de logo */}
                      {/* <div 
                        className="w-full h-full flex items-center justify-center font-bold text-lg md:text-xl"
                        style={{ color: exp.color }}
                      >
                        {exp.logoFallback}
                      </div> */}
                      
                      <img 
                        src={exp.logo} 
                        alt={exp.company}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                 
                    </div>

                    {/* Mobile header */}
                    <div className="md:hidden flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold">{exp.company}</h3>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:scale-110 transition-transform flex-shrink-0"
                          style={{ color: hoveredId === exp.id ? exp.color : undefined }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      {exp.isActive && (
                        <span 
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold mt-2"
                          style={{ 
                            backgroundColor: exp.color + '20',
                            color: exp.color
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: exp.color }} />
                          En cours
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Header - Desktop only */}
                  <div className="hidden md:flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold">{exp.company}</h3>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:scale-110 transition-transform"
                          style={{ color: hoveredId === exp.id ? exp.color : undefined }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-lg font-semibold text-muted-foreground mb-1">{exp.role}</p>
                    </div>

                    {/* Active badge */}
                    {exp.isActive && (
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                        style={{ 
                          backgroundColor: exp.color + '20',
                          color: exp.color
                        }}
                      >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: exp.color }} />
                        En cours
                      </span>
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{exp.period}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Role - Show on mobile */}
                  <p className="md:hidden text-base font-semibold text-muted-foreground mb-3">{exp.role}</p>

                  {/* Description */}
                  <p className="text-sm text-left md:text-base text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover CTA */}
                  <div 
                    className="mt-4 transition-all duration-300"
                    style={{
                      opacity: hoveredId === exp.id ? 1 : 0,
                      maxHeight: hoveredId === exp.id ? '50px' : '0',
                      overflow: 'hidden'
                    }}
                  >
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                      style={{ color: exp.color }}
                    >
                      En savoir plus
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "4+", label: "Collaborations" },
            { value: "3 ans", label: "D'expérience" },
            { value: "8+", label: "Projets livrés" },
            { value: "100%", label: "Remote ready" }
          ].map((stat, i) => (
            <div 
              key={i}
              className="experience-item opacity-0 text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-primary/30 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${(experiences.length + i) * 150}ms` }}
            >
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;