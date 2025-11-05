import { useEffect, useState } from "react";
import { 
  Code2, 
  Smartphone, 
  RefreshCw, 
  Zap, 
  Shield, 
  Rocket,
  Sparkles,
  TrendingUp,
  Layers
} from "lucide-react";

export const ExpertiseSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Développement Web",
      tagline: "Du code qui convertit",
      description: "Applications web modernes, rapides et scalables. React, Next.js, Node.js  je maîtrise toute la stack pour transformer vos idées en produits prêts à lancer.",
      features: ["Performance optimale", "SEO-friendly", "Architecture scalable"],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-blue-500/10",
      textColor: "text-blue-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Développement Mobile",
      tagline: "Dans la poche de vos clients",
      description: "Apps cross-platform avec Flutter. Interface fluide, performances solides, expérience utilisateur irréprochable. iOS et Android, un seul code.",
      features: ["Flutter", "UI/UX moderne", "Offline-first"],
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      iconBg: "bg-purple-500/10",
      textColor: "text-purple-500"
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Refonte & Modernisation",
      tagline: "Donnez une seconde vie",
      description: "Votre site est lent, dépassé, pas responsive ? Je repense l'architecture, modernise le design et optimise les performances. Résultat : une présence digitale qui en impose.",
      features: ["Audit complet", "Migration sécurisée", "Design system moderne"],
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      iconBg: "bg-orange-500/10",
      textColor: "text-orange-500"
    }
  ];

  const stats = [
    { icon: <Zap />, label: "Livraison rapide", value: "2-4 semaines" },
    { icon: <Shield />, label: "Code sécurisé", value: "100% testé" },
    { icon: <Rocket />, label: "Performance", value: "Score 90+" },
    { icon: <TrendingUp />, label: "Évolutif", value: "Scale ready" }
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

    const cards = document.querySelectorAll(".expertise-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 150}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" className="py-24 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
         
          <h2 className="text-4xl md:text-6xl font-bold">
            Expertises qui <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary">transforment</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Du concept à la prod, je prends en charge toute la chaîne technique pour que vous puissiez vous concentrer sur votre croissance.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="expertise-card  opacity-0 group"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`relative h-full p-8 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm ${
                activeCard === index 
                  ? 'border-transparent shadow-2xl scale-105 -translate-y-2' 
                  : 'border-white/10 hover:border-white/20'
              }`}
             
              >
                {/* Glowing effect on active */}
                {activeCard === index && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-20 blur-xl`} />
                )}

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl ${service.iconBg} ${service.textColor} transition-transform duration-500 ${
                    activeCard === index ? 'scale-110 rotate-6' : ''
                  }`}>
                    {service.icon}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className={`text-sm font-medium ${service.textColor}`}>{service.tagline}</p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-left leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${service.textColor.replace('text-', 'bg-')}`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover CTA */}
                  <div className={`transition-all duration-300 ${
                    activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <a 
                      href="#contact" 
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${service.textColor} ${service.iconBg} hover:scale-105 transition-transform`}
                    >
                      Discutons-en
                      <Layers className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="expertise-card opacity-0 p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${(services.length + index) * 150}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ExpertiseSection;