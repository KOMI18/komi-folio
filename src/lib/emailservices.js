
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import emailjs from "emailjs-com";

  const handleSendSuscribtion = async (email) => {
    const firebaseConfig = {
        apiKey: "AIzaSyDrA0JIHFmF7R-p_tL0sKypuTgoCttFyFc",
        authDomain: "test-push-d9637.firebaseapp.com",
        projectId: "test-push-d9637",
        storageBucket: "test-push-d9637.firebasestorage.app",
        messagingSenderId: "174099939928",
        appId: "1:174099939928:web:19fed41a98b10543ffc02d",
        measurementId: "G-4ZX69D6DRT"
      };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
   const USER_ID = "vzeV7F7Fu9dughDyi";
   const SERVICE_ID = "service_evh08ne";
   const TEMPLATE_ID = "template_2k65re8";
 
    const templateParams = {
        from_name: "Parfait Kom",
        user_name: email,
        to_name: email,
        message: `Salut ${email} 👋,
        Merci de t’être abonné(e) à ma newsletter !
        
        Ici, je partage mes projets, mes découvertes tech, et des conseils autour du développement web, mobile et backend.
        
        Promis, pas de spam  juste du contenu utile, inspirant et authentique.
        
        À très bientôt dans ta boîte mail 👨‍💻  
        
        Parfait Kom`,
      };


    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);

      // 2️⃣ Stockage email dans Firebase
      await addDoc(collection(db, "subscribers"), { email, createdAt: new Date() });
    } catch (error) {
      console.error("Erreur :", error);
      alert("Échec de l'inscription. Veuillez réessayer.");
    } finally {
    }
  };



export default handleSendSuscribtion;
