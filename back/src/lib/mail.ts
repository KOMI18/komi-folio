import { env } from "../env.js";

export async function sendMail(subject: string, text: string, replyTo?: string): Promise<void> {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.RESEND_FROM) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: [env.CONTACT_TO_EMAIL],
      subject,
      text,
      reply_to: replyTo,
    }),
  });
  if (!res.ok) console.warn("Envoi email échoué :", res.status, await res.text());
}
