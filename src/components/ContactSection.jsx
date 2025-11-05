import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Clock,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { useState } from "react";
import * as emailjs from "emailjs-com";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const SERVICE_ID = "service_evh08ne";
    const TEMPLATE_ID = "template_2k65re8";
    const USER_ID = "vzeV7F7Fu9dughDyi";

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: "tehemparfait@gmail.com",
      message: formData.message,
    };

    setIsSubmitting(true);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      setIsSuccess(true);
      setFormData({ email: "", name: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to send:", error);
      alert("Échec de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "tehemparfait@gmail.com",
      href: "mailto:tehemparfait@gmail.com",
      color: "#3B82F6"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Téléphone",
      value: "+237 695-511-268",
      href: "tel:+237695511268",
      color: "#10B981"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Localisation",
      value: "Yaoundé, Cameroun",
      href: null,
      color: "#F59E0B"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/parfait-kom-a25925268/",
      label: "LinkedIn",
      color: "#0A66C2"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://x.com/ParfaitKom",
      label: "Twitter",
      color: "#1DA1F2"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/parfait_tk/",
      label: "Instagram",
      color: "#E4405F"
    }
  ];

  const availability = [
    { icon: <Clock />, text: "Répond sous 24h", color: "#10B981" },
    { icon: <Calendar />, text: "Disponible pour projets", color: "#3B82F6" },
    { icon: <MessageCircle />, text: "Consultation gratuite", color: "#8B5CF6" }
  ];

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
         
          <h2 className="text-4xl md:text-6xl font-bold">
            Travaillons <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary">ensemble</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un projet en tête ? Une question ? Ou simplement envie de discuter tech ? 
            Je suis là pour transformer vos idées en réalité.
          </p>
        </div>

        {/* Availability badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {availability.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              <div style={{ color: item.color }}>
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid text-left grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact Info - 2/5 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="text-primary" />
                Contactez-moi
              </h3>
              
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href || undefined}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group block p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    cursor: item.href ? 'pointer' : 'default'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}20`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="text-primary" />
                Retrouvez-moi aussi sur
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    style={{
                      '--hover-color': social.color
                    }}
                    title={social.label}
                  >
                    <div className="group-hover:scale-110 transition-transform" style={{ color: social.color }}>
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <p className="font-semibold text-green-500">Actuellement disponible</p>
                  <p className="text-sm text-muted-foreground">Réponse sous 24h garantie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form - 3/5 */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-2xl">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4 animate-fade-in">
                  <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-500 mb-4">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold">Message envoyé !</h3>
                  <p className="text-muted-foreground">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais, généralement sous 24h.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform mt-4"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Envoyez-moi un message</h3>
                  <p className="text-muted-foreground mb-8">
                    Remplissez le formulaire et je vous recontacterai rapidement.
                  </p>

                  <form onSubmit={handleSubmit} className=" text-left space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Votre nom *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="votre nom"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Votre email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Votre message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border-2 border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Bonjour, j'aimerais discuter d'un projet..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;