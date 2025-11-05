import { useState, useEffect } from "react";
import { 
  Code2, 
  Smartphone, 
  Server, 
  Wrench,
  Sparkles,
  TrendingUp,
  Zap,
  CheckCircle2
} from "lucide-react";

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      id: "frontend",
      name: "Frontend & Mobile",
      icon: <Smartphone className="w-5 h-5" />,
      color: "#3B82F6",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "backend",
      name: "Backend & Database",
      icon: <Server className="w-5 h-5" />,
      color: "#8B5CF6",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "tools",
      name: "Outils & DevOps",
      icon: <Wrench className="w-5 h-5" />,
      color: "#10B981",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const skills = [
    // Frontend & Mobile
    { 
      name: "Flutter", 
      category: "frontend", 
      experience: "2+ ans",
      projects: "3+ projets",
      icon: "/logo/flutter.svg",
      description: "Applications mobiles cross-platform iOS & Android",
      mastery: "Intermediate"
    },
    { 
      name: "React", 
      category: "frontend", 
      experience: "3+ ans",
      projects: "4+ projets",
      icon: "/logo/react.svg",
      description: "Interfaces web modernes et applications SPA",
      mastery: "Intermediate"
    },
    { 
      name: "Next.js", 
      category: "frontend", 
      experience: "2+ ans",
      projects: "3+ projets",
      icon: "/logo/nextdotjs.svg",
      description: "Applications web full-stack avec SSR",
      mastery: "Intermediate"
    },
    { 
      name: "Tailwind CSS", 
      category: "frontend", 
      experience: "2+ ans",
      projects: "10+ projets",
      icon: "/logo/tailwindcss.svg",
      description: "Design system et UI responsive",
      mastery: "Avançé"
    },
    { 
      name: "JavaScript", 
      category: "frontend", 
      experience: "4+ ans",
      projects: "6+ projets",
      icon: "/logo/javascript.svg",
      description: "ES6+, async/await, APIs modernes",
      mastery: "Intermediate"
    },
    { 
      name: "Dart", 
      category: "frontend", 
      experience: "2+ ans",
      projects: "3+ projets",
      icon: "/logo/dart.svg",
      description: "Langage principal pour Flutter",
      mastery: "Intermediate"
    },

    // Backend
    { 
      name: "Node.js", 
      category: "backend", 
      experience: "3+ ans",
      projects: "5+ projets",
      icon: "/logo/nodedotjs.svg",
      description: "APIs REST, microservices, serveurs temps réel",
      mastery: "Intermediate"
    },
    { 
      name: "Express", 
      category: "backend", 
      experience: "3+ ans",
      projects: "5+ projets",
      icon: "/logo/express.svg",
      description: "Framework backend léger et performant",
      mastery: "Intermediate"
    },
    { 
      name: "MongoDB", 
      category: "backend", 
      experience: "2+ ans",
      projects: "4+ projets",
      icon: "/logo/mongodb.svg",
      description: "Base de données NoSQL, agrégation, indexation",
      mastery: "Intermediate"
    },
    { 
      name: "Mongoose", 
      category: "backend", 
      experience: "2+ ans",
      projects: "4+ projets",
      icon: "/logo/mongoose.svg",
      description: "ODM pour MongoDB, schemas et validation",
      mastery: "Intermediate"
    },

    // Tools
    { 
      name: "Git/GitHub", 
      category: "tools", 
      experience: "4+ ans",
      projects: "Usage quotidien",
      icon: "/logo/github.svg",
      description: "Versionning, workflows, CI/CD, collaboration",
      mastery: "Avancé"
    },
    { 
      name: "Postman", 
      category: "tools", 
      experience: "3+ ans",
      projects: "Usage quotidien",
      icon: "/logo/postman.svg",
      description: "Tests API, collections, automatisation",
      mastery: "expert"
    },
    { 
      name: "Notion", 
      category: "tools", 
      experience: "2+ ans",
      projects: "Gestion projets",
      icon: "/logo/notion.svg",
      description: "Documentation, planning, organisation",
      mastery: "avancé"
    },
  ];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

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

    const elements = document.querySelectorAll(".skill-item");
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 50}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeCategory]);

  const getMasteryBadge = (mastery) => {
    const badges = {
      expert: { label: "Expert", color: "#10B981", bg: "#10B98120" },
      avancé: { label: "Avancé", color: "#3B82F6", bg: "#3B82F620" },
      Intermediate: { label: "Intermediate", color: "#FFA07A", bg: "#FFA07A20" }

    };
    return badges[mastery] || badges.avancé;
  };

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background to-background/50">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Technologies maîtrisées</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">technique</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des années d'expérience concrète sur des projets réels. Pas de théorie, que de la pratique.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-white/5 hover:bg-white/10 border border-white/10"
            }`}
          >
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Toutes
            </span>
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-white shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
              style={{
                backgroundColor: activeCategory === cat.id ? cat.color : undefined
              }}
            >
              <span className="flex items-center gap-2">
                {cat.icon}
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => {
            const category = skillCategories.find(c => c.id === skill.category);
            const masteryBadge = getMasteryBadge(skill.mastery);
            
            return (
              <div
                key={index}
                className="skill-item opacity-0 group"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div 
                  className="relative h-full p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  style={{
                    borderColor: hoveredSkill === index ? category.color : 'rgba(255,255,255,0.1)',
                    backgroundColor: hoveredSkill === index ? `${category.color}10` : 'rgba(255,255,255,0.02)',
                    transform: hoveredSkill === index ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredSkill === index ? `0 20px 40px ${category.color}30` : 'none'
                  }}
                >
                  {/* Mastery badge */}
                  <div 
                    className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: masteryBadge.bg,
                      color: masteryBadge.color
                    }}
                  >
                    {masteryBadge.label}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-16 h-16 mb-4 rounded-xl flex items-center justify-center transition-transform duration-300"
                    style={{
                      backgroundColor: `${category.color}15`,
                      transform: hoveredSkill === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-10 h-10 object-contain"
                      style={{
                        filter: `drop-shadow(0 0 8px ${category.color}40)`
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>

                  {/* Stats */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" style={{ color: category.color }} />
                      <span>{skill.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="w-4 h-4" style={{ color: category.color }} />
                      <span>{skill.projects}</span>
                    </div>
                  </div>

                  {/* Description on hover */}
                  <div 
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: hoveredSkill === index ? '100px' : '0',
                      opacity: hoveredSkill === index ? 1 : 0
                    }}
                  >
                    <p className="text-sm text-muted-foreground pt-3 border-t border-white/10">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
       
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
          animation: slide-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;