import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import * as emailjs from "emailjs-com";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const SERVICE_ID = "service_evh08ne";
    const TEMPLATE_ID =  "template_2k65re8",
    const USER_ID = "vzeV7F7Fu9dughDyi",
    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: "tehemparfait@gmail.com",
      message: formData.message,
    };
    setIsSubmitting(true);
    emailjs
    .send(
      contactConfig.YOUR_SERVICE_ID,
      contactConfig.YOUR_TEMPLATE_ID,
      templateParams,
      contactConfig.YOUR_USER_ID
    )
    .then(
      (result) => {
        console.log(result.text);
        setFormdata({
          loading: false,
          alertmessage: "SUCCESS! ,Thankyou for your messege",
          variant: "success",
          show: true,
        });
      },
      (error) => {
        console.log(error.text);
        setFormdata({
          alertmessage: `Faild to send!,${error.text}`,
          variant: "danger",
          show: true,
        });
        document.getElementsByClassName("co_alert")[0].scrollIntoView();
      }
    );
    setTimeout(() => {
      toast({
        title: "Message envoyé!",
        description: " Merci de m'avoir envoyé un message. Je vous recontacterais très bientôt.",
      });
      setIsSubmitting(false);
    }, 1500);
  };
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Entrer en <span className="text-primary"> Contact</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Vous avez un projet en tête ou souhaitez collaborer ? 
        N'hésitez pas à me contacter. Je suis toujours ouvert à de nouvelles opportunités.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
               Information de Contact
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:tehemparfait@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    tehemparfait@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Téléphone</h4>
                  <a
                    href="tel:+237695511268"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +(237) 695-511-268 
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Localisation</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Yaoundé, Cameroun
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connectez-vous avec moi</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/in/parfait-kom-a25925268/" target="_blank">
                  <Linkedin />
                </a>
                <a href="https://x.com/ParfaitKom" target="_blank">
                  <Twitter />
                </a>
                <a href="https://www.instagram.com/parfait_tk/" target="_blank">
                  <Instagram />
                </a>
               
              </div>
            </div>
          </div>

          <div
            className="bg-card p-8 rounded-lg shadow-xs"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold mb-6"> Envoyer un message</h3>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Votre nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Parfait Kom..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Votre e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="ex : johndoe@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Votre Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, Je voudrais avoir plus d'informations..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Envoi..." : "Envoyer Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
