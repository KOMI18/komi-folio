import { cn } from "@/lib/utils";
import { 
  Home, User, Briefcase, Code, Layers, Mail, 
  Calendar, BookText, MoreHorizontal, X 
} from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/#hero", icon: Home },
  { name: "A Propos", href: "/#about", icon: User },
  { name: "Exp", href: "/#experience", icon: Briefcase },
  { name: "Skills", href: "/#skills", icon: Code },
  { name: "Projets", href: "/#projects", icon: Layers },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Blog", href: "/blog", icon: BookText },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On sépare les items : 4 principaux + le reste
  const mainItems = navItems.slice(0, 4);
  const secondaryItems = navItems.slice(4);

  return (
    <>
      {/* --- DESKTOP (Inchangé) --- */}
      <header className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center transition-all duration-500",
        isScrolled ? "w-[90%] max-w-4xl" : "w-full max-w-5xl"
      )}>
        <div className="w-full flex items-center justify-between px-6 py-3 bg-background/60 backdrop-blur-xl border border-border/50 shadow-2xl rounded-full">
          <a href="/#hero" className="text-lg font-bold">Parfait Kom</a>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-primary transition-all">
                <item.icon size={16} />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
          {/* <ThemeToggle /> */}
        </div>
      </header>

      {/* --- MOBILE (Dock avec Menu "Plus") --- */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
        
        {/* Menu contextuel (s'affiche quand on clique sur "Plus") */}
        <div className={cn(
          "absolute bottom-20 right-0 left-0 bg-background/95 backdrop-blur-xl border border-border/50 rounded-[2rem] p-4 shadow-2xl transition-all duration-300 origin-bottom",
          showMore ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}>
          <div className="grid grid-cols-3 gap-4">
            {secondaryItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setShowMore(false)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-primary/10 text-muted-foreground"
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Barre principale (Dock) */}
        <div className="flex items-center justify-around p-2 bg-background/80 backdrop-blur-2xl border border-border/40 shadow-xl rounded-[2.5rem]">
          {mainItems.map((item) => (
            <a key={item.name} href={item.href} className="flex flex-col items-center p-3 text-muted-foreground hover:text-primary">
              <item.icon size={22} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </a>
          ))}
          
          {/* Bouton Toggle "Plus" */}
          <button 
            onClick={() => setShowMore(!showMore)}
            className={cn(
              "flex flex-col items-center p-3 transition-colors",
              showMore ? "text-primary" : "text-muted-foreground"
            )}
          >
            {showMore ? <X size={22} /> : <MoreHorizontal size={22} />}
            <span className="text-[10px] font-medium">{showMore ? "Fermer" : "Plus"}</span>
          </button>

          <div className="h-8 w-[1px] bg-border/60 mx-1" />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </>
  );
};