
import { ArrowRight , Image} from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 bg-background">
       <h2 className="text-3xl md:text-4xl font-bold mb-4 py-4 text-center">
          {" "}
          A <span className="text-primary">Propos</span> 
        </h2>
      <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-left  md:text-left">
            Je transforme les idées en solutions qui bossent 24h/24 pour vous.
          </h2>

          <p className="text-muted-foreground text-left md:text-left">
            Je suis Parfait Kom, développeur mobile & web indépendant. Je construis des applications solides et utiles pour les PME et entrepreneurs du monde entier. Mon objectif ? Livrer des solutions concrètes, efficaces, sans blabla inutile. Du code propre, des résultats mesurables, et un vrai sens du travail bien fait.
          </p>

          <p className="text-muted-foreground text-left md:text-left">
            Mon approche est simple : comprendre rapidement vos enjeux, proposer des idées concrètes, et livrer des résultats de qualité. Pas de jargon. Pas de perte de temps. Juste du travail bien fait, avec méthode, passion et efficacité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#contact" className="cosmic-button">
              Entrer en contact
            </a>

            <a
              href="/docs/Parfait_Kom_CV.pdf"
              download
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2"
            >
              Télécharger mon CV <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
         {/* Image */}
         <div className="flex justify-center md:justify-start">
          <div className="w-60 h-60 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 relative transform rotate-3 rounded-xl overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src="/images/parfait-kom.jpg"
              alt="Parfait Kom"
              className="w-full h-full object-cover"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;