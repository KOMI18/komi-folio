
import { ArrowRight , Image} from "lucide-react";
import { useEffect } from "react";
export const AboutSection = () => {
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
  
      const cards = document.querySelectorAll(".about-card");
      cards.forEach((card) => observer.observe(card));
  
      return () => observer.disconnect();
    }, []);
  
  return (
    <section id="about" className="py-24 px-4 bg-background">
       <h2 className="text-3xl md:text-4xl font-bold mb-4 py-4 text-center">
          {" "}
          A <span className="text-primary">Propos</span> 
        </h2>
      <div className="about-card opacity-0 transition-opacity duration-700 ease-out translate-y-4 container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2  gap-12 items-center">
        {/* Image */}
        <div className="order-first md:order-last flex justify-center md:justify-start">
          <div className="w-40 h-20 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] relative transform rotate-3 rounded-xl overflow-hidden border-4 border-primary shadow-lg transition-transform duration-500 hover:scale-105">
            <img
              src="/projects/parfaitkom.jpeg"
              alt="Parfait Kom"
              className="w-full h-full object-cover"
              // width={500}
              // height={500}
            />
          </div>
        </div>
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
              href="/docs/parfait_kom_cv.pdf"
              download
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2"
            >
              Télécharger mon CV <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;