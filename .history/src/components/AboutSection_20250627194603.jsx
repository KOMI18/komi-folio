import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          A Propos de <span className="text-primary"> Moi</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-left">
            Je transforme les idées en solutions qui bossent 24h/24 pour vous.
            </h3>

            <p className="text-muted-foreground text-left">
                  Développeur mobile & web indépendant, 
                  je construis des applications solides et utiles pour 
                  les PME et entrepreneurs du monde entier. Mon objectif ? Livrer des solutions concrètes, efficaces, sans blabla inutile. Du code propre, des résultats mesurables, et un vrai sens du travail bien fait.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Entrer en contact
              </a>

              <a
                href=""
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Telecharger Mon CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Développement Web</h4>
                  <p className="text-muted-foreground">
                  Votre site ne doit pas juste exister. Il doit convaincre, vendre, fonctionner sans failles.
                  Moi, je construis des plateformes web solides, rapides et faites pour durer.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Développement Mobile</h4>
                  <p className="text-muted-foreground">
                  Vos clients sont sur leur téléphone ? Alors votre app doit être simple, rapide et agréable.
                  Je conçois des applis mobiles qui tournent à fond, sans bug ni prise de tête.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Refonte de site web</h4>
                  <p className="text-muted-foreground">
                  Un site lent, dépassé ou confus, c’est un frein pour votre croissance.
                  Je reprends tout, je restructure, je modernise  et votre site retrouve de l’impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
