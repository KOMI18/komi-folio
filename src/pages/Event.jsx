import { useState, useEffect } from "react";
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Code,
  Award,
  Sparkles,
  ExternalLink,
  Clock,
  Target,
  Zap
} from "lucide-react";

export const EventsHackathonsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Cameroun international Tech Summit",
      type: "hackathon",
      date: "2024",
      location: "Yaoundé, Cameroun",
      position: "",
      // prize: "500,000 FCFA",
      project: "Mints",
      url : "https://mints-beryl.vercel.app/",
      attendees: "250+",
      tech: ["React", "Node Js", "Google Maps API"],
      teamSize: 5,
      description: "Développement d'une application web m pour permettre au ONG humanitaire de cible les zone en manque d'eau potable et intervenir plus efficacement",
      achievements: ["Meilleure UI/UX", "Innovation Prize", "Public's Choice"],
      color: "#F59E0B",
      isWinner: false,
      image: "/projects/summit.jpeg"
    },
    {
      id: 2,
      title: "Yaounde City Hack",
      type: "hackathon",
      date: "2024",
      location: "Yaounde , Cameroun",
      position: "",
      teamSize: 4,

      project: "Aviato",
      tech: ["React", "Ts", "Node Js"],
      attendees: "100+",
      description: "Plate Forme centralisant les offre d'emploie et les formations tout en recommandant des entreprises et des offres d'emploi aux utilisateurs",
      // achievements: ["Speaker", "Workshop Facilitator"],
      color: "#3B82F6",
      isWinner: false,
      image: "/projects/city.jpeg"
    },
    {
      id: 3,
      title: "Prix Exellence Zachariass Tanee",
      type: "competition",
      date: "2024",
      location: "Yaoundé, Cameroun",
      position: "Top 15",
      // prize: "300,000 FCFA",
      project: "EduTrack - Système de gestion scolaire intelligent",
      tech: ["React", "Node.js", "MongoDB"],
      teamSize: 5,
      description: "Plateforme web de gestion scolaire avec suivi en temps réel des performances, communication parents-professeurs et gestion administrative.",
      achievements: ["Best Business Model", "Tech Excellence"],
      color: "#8B5CF6",
      isWinner: false,
      image: "/events/startup-weekend.jpg"
    },
    {
      id: 3,
      title: "La face cachee des reseaux sociaux",
      type: "conference",
      date: "2022",
      location: "Yaoundé, Cameroun",
      // position: "2ème place",
      // prize: "300,000 FCFA",
      project: "",
      tech: [],
      teamSize: 5,
      description: "PAIR EDUCATEUR dans la promotion de l'utilisation citoyenne des reseaux sociaux",
      // achievements: ["SUP'PTIC", "MINPOSTEL"],
      color: "#8B5CF6",
      isWinner: false,
      image: "/projects/certificat.jpg"
    },
    {
      id: 4,
      title: "DevFest Yaounde 2025",
      type: "conference",
      date: "2025",
      location: "Yaounde , Cameroun",
      position: "Participant",
      project: "",
      tech: ["Flutter", "AI", "Marketing", "AI"],
      // teamSize: 4,
      description: "Le DevFest rassemble chaque année des centaines de développeurs, passionnés de technologie et innovateurs autour d'une journée riche en apprentissage",
      // achievements: ["Global Top 100", "Social Impact Award"],
      color: "#10B981",
      isWinner: false,
      image: "/projects/devfest.jpeg"
    },
    // {
    //   id: 5,
    //   title: "Cameroon Tech Week 2022",
    //   type: "conference",
    //   date: "Novembre 2022",
    //   location: "Yaoundé, Cameroun",
    //   position: "Participant",
    //   project: "Networking & Learning",
    //   tech: ["Web3", "Blockchain", "AI/ML"],
    //   attendees: "500+",
    //   description: "Participation active aux sessions sur les technologies émergentes, networking avec des entrepreneurs tech et exploration des opportunités blockchain.",
    //   achievements: ["Networking", "Workshops Completed"],
    //   color: "#EC4899",
    //   isWinner: false,
    //   image: "/events/cameroon-tech-week.jpg"
    // }
  ];

  const stats = [
    { icon: <Trophy />, value: "5", label: "Events participés", color: "#F59E0B" },
    // { icon: <Award />, value: "3", label: "Prix remportés", color: "#10B981" },
    { icon: <Users />, value: "3+", label: "Projets en équipe", color: "#3B82F6" },
    { icon: <Code />, value: "4+", label: "Projets développés", color: "#8B5CF6" }
  ];

  const filters = [
    { id: "all", label: "Tous", icon: <Sparkles /> },
    { id: "hackathon", label: "Hackathons", icon: <Code /> },
    { id: "conference", label: "Conférences", icon: <Users /> },
    { id: "competition", label: "Compétitions", icon: <Trophy /> }
  ];

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(event => event.type === activeFilter);

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

    const elements = document.querySelectorAll(".event-card");
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <div className="min-h-screen  py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background to-background/50">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          
          <h1 className="text-4xl mt-20 md:text-6xl font-bold">
            Mon parcours <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary">compétitif</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des hackathons, des conférences enrichissantes et des projets réalisés sous pression. 
            Voici mes expériences en compétition tech.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="event-card opacity-0 p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="space-y-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="event-card opacity-0 group"
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div 
                className="relative p-8 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm"
                style={{
                  borderColor: hoveredEvent === event.id ? event.color : 'rgba(255,255,255,0.1)',
                  backgroundColor: hoveredEvent === event.id ? `${event.color}10` : 'rgba(255,255,255,0.02)',
                  transform: hoveredEvent === event.id ? 'translateX(8px)' : 'translateX(0)',
                  boxShadow: hoveredEvent === event.id ? `0 20px 40px ${event.color}30` : 'none'
                }}
              >
                {/* Winner badge */}
                {event.isWinner && (
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                    style={{ backgroundColor: `${event.color}30`, color: event.color }}
                  >
                    <Trophy className="w-3 h-3" />
                    Gagnant
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Image */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden group-hover:shadow-2xl transition-shadow duration-300">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback gradient if image doesn't load
                          e.target.style.display = 'none';
                          e.target.parentElement.style.background = `linear-gradient(135deg, ${event.color}40, ${event.color}20)`;
                        }}
                      />
                      {/* Overlay gradient */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(to top, ${event.color}60, transparent)`
                        }}
                      />
                    </div>
                  </div>

                  {/* Middle: Event Info */}
                  <div className=" text-left lg:col-span-3 space-y-4">
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" style={{ color: event.color }} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" style={{ color: event.color }} />
                        <span>{event.location}</span>
                      </div>
                      {event.teamSize && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" style={{ color: event.color }} />
                          <span>Équipe de {event.teamSize}</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" style={{ color: event.color }} />
                          <span>{event.attendees} participants</span>
                        </div>
                      )}
                    </div>

                    {/* Position/Prize */}
                    <div 
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: `${event.color}20` }}
                    >
                      <div className="font-bold text-lg mb-1" style={{ color: event.color }}>
                        {event.position}
                      </div>
                      {event.prize && (
                        <div className="text-sm text-muted-foreground">{event.prize}</div>
                      )}
                    </div>
                  </div>

                  {/* Right: Project Details */}
                  <div className="text-left lg:col-span-4 space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5" style={{ color: event.color }} />
                        {event.project}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-muted-foreground">{event.tech.length > 1 ? "Technologies utilisées" : ""}</h5>
                      <div className="flex flex-wrap gap-2">
                        {event.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {event.achievements && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2 text-muted-foreground">Réalisations</h5>
                        <div className="flex flex-wrap gap-2">
                          {event.achievements.map((achievement, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5"
                              style={{ backgroundColor: `${event.color}20`, color: event.color }}
                            >
                              <Award className="w-3 h-3" />
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border border-primary/20 text-center">
          <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Vous organisez un hackathon ?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Je suis toujours partant pour relever de nouveaux défis tech. 
            Contactez-moi pour participer à votre prochain événement !
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50"
          >
            Me contacter
            <ExternalLink className="w-5 h-5" />
          </a>
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
          animation: slide-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EventsHackathonsPage;