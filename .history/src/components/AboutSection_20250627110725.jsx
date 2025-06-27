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
            <h3 className="text-2xl font-semibold">
            Je transforme les idées en solutions qui bossent 24h/24 pour vous.
            </h3>

            <p className="text-muted-foreground">
            Je suis Parfait Kom, développeur mobile & web indépendant.
            Mais ce que je fais, c’est bien plus que du code.
            Je crée des applications qui répondent à des vrais besoins
            des outils qui marchent, qui simplifient, qui automatisent, qui font gagner du temps, 
            et surtout… qui apportent de la valeur à ceux qui les utilisent.
            </p>

            <p className="text-muted-foreground">
            J’accompagne des PME, startups et entrepreneurs du monde entier dans
             la création de leurs solutions digitales. Mon approche est simple 
             : comprendre rapidement vos enjeux, proposer des idées concrètes, et livrer des résultats de qualité, rapidement. 
            Pas de jargon. Pas de perte de temps. Juste du travail bien fait, avec méthode, passion et efficacité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href=""
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
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
