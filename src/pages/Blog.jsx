import { useState, useEffect } from "react";
import * as emailjs from "emailjs-com";
import handleSendSuscribtion from "../lib/emailservices";
import {
  BookOpen,
  Sparkles,
  Bell,
  Code,
  Lightbulb,
  Rocket,
  Mail,
  CheckCircle2,
  TrendingUp,
  Coffee,
  Zap
} from "lucide-react";

export const BlogComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleSendSuscribtion(email);
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail("")
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      console.error("Failed to send:", error);
      alert("Échec de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const upcomingTopics = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Flutter Tips & Tricks",
      description: "Astuces avancées pour optimiser vos apps Flutter",
      color: "#3B82F6"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "De l'idée au MVP",
      description: "Comment lancer rapidement un produit minimum viable",
      color: "#10B981"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Architecture logicielle",
      description: "Clean Architecture, SOLID et patterns essentiels",
      color: "#F59E0B"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Freelancing Tech",
      description: "Mes retours d'expérience en tant que dev indépendant",
      color: "#8B5CF6"
    }
  ];

  const features = [
    "Tutoriels techniques détaillés",
    "Retours d'expérience projets",
    "Best practices & code snippets",
    "Analyses d'outils et frameworks"
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background" />
      
      {/* Floating particles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto max-w-5xl relative z-10 py-20">
        {/* Main Content */}
        <div className="text-center space-y-8 mb-16">
          {/* Icon */}
          {/* <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 animate-float">
            <BookOpen className="w-16 h-16 text-primary" />
          </div> */}

          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Bientôt disponible</span>
          </div> */}

          {/* Title */}
          <div className="mt-20 space-y-4 animate-fade-in-delay-1">
            <h1 className="text-5xl md:text-7xl font-bold">
              Le Blog arrive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary">
                très bientôt
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Un espace pour partager mes connaissances, tutoriels, et retours d'expérience sur le développement moderne.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 animate-fade-in-delay-2">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Articles prévus</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-1">3</div>
              <div className="text-sm text-muted-foreground">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-1">12/2025</div>
              <div className="text-sm text-muted-foreground">Lancement prévu</div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="max-w-xl mx-auto mb-16 animate-fade-in-delay-3">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-2xl">
            {isSubscribed ? (
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-500 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Vous êtes inscrit !</h3>
                <p className="text-muted-foreground">
                  Je vous préviendrai dès le lancement du blog. À très bientôt !
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Bell className="w-4 h-4" />
                    Soyez les premiers informés
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Recevez une notification au lancement
                  </h3>
                  <p className="text-muted-foreground">
                    Inscrivez-vous pour être notifié dès la publication du premier article
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={isSubmitting || !email}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Inscription...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          M'informer
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    🔒 Zéro spam. Juste une notification au lancement.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Upcoming Topics */}
        <div className="space-y-8 animate-fade-in-delay-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ce qui vous attend
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des articles concrets, des tutoriels pratiques et des insights basés sur mon expérience terrain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTopics.map((topic, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div 
                  className="inline-flex p-3 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${topic.color}20`, color: topic.color }}
                >
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="text-muted-foreground text-sm">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border border-primary/20 animate-fade-in-delay-5">
          <div className="flex items-center gap-3 mb-6">
            <Coffee className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Au programme</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 animate-fade-in-delay-6">
          <p className="text-muted-foreground mb-4">
            En attendant, retrouvez-moi sur mes réseaux pour suivre mon actualité
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/parfait-kom-a25925268/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 font-medium"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/ParfaitKom"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 font-medium"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-5 {
          animation: fade-in 0.8s ease-out 1s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-6 {
          animation: fade-in 0.8s ease-out 1.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default BlogComingSoonPage;