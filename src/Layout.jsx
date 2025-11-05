// src/components/Layout.jsx
import { useState, useEffect } from "react";
import { StarBackground } from "./components/StarBackground";
import { Outlet } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";

export const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <DotLottieReact
            src="/animation/initial.lottie"
            loop
            autoplay
            style={{ width: "600px", height: "600px" }}
          />
  
        </div>
    );
  }

  return (
    <div className="relative">
      <StarBackground />
      <Navbar />
      <ThemeToggle />

      {/* 🔹 Ici, toutes les pages s'afficheront */}
      <main className="min-h-screen">
        <Outlet  />
      </main>

      <Footer />
    </div>
  );
};
