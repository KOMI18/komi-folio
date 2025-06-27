import { useEffect } from "react";
import { Code, User, Briefcase } from "lucide-react";

export const ExpertiseSection = () => {
  const services = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Développement Web",
      description:
        "Des sites solides, rapides, pensés pour convaincre et performer. Rien n'est laissé au hasard."
    },
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "Développement Mobile",
      description:
        "Des applications mobiles modernes, stables et fluides. Pensées pour vos utilisateurs, conçues pour durer."
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Refonte de Site Web",
      description:
        "Un site obsolète, c’est un frein. Je repense, restructure et redonne vie à votre présence en ligne."
    }
  ];

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
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll(".expertise-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" className="py-24 px-4 bg-background">
      <div className="container max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Mes <span className="text-primary">Expertises</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {services.map((service, index) => (
            <div
              key={index}
              className="expertise-card opacity-0 transition-opacity duration-700 ease-out translate-y-4 relative z-10 bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 py-1 rounded-full border border-primary text-primary text-sm font-medium shadow">
                  {service.title}
                </div>
                <div className="flex flex-col items-center pt-10 space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">{service.icon}</div>
                  <p className="text-muted-foreground text-sm text-center">
                    {service.description}
                  </p>
                </div>
              </div>
              {index < services.length  && (
                <svg
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                  className="w-full h-8 mt-4"
                >
                  <path
                    d="M0 0 C 50 50, 50 50, 100 0"
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6 4"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
