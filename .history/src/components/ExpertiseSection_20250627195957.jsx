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

  return (
    <section id="expertise" className="py-24 px-4 bg-background">
      <div className="container max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Mes <span className="text-primary">Expertises</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};
