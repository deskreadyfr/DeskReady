import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = "deskready.fr@gmail.com";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { record, type } = await req.json();

    if (type !== "INSERT" || !record.nom) {
      return new Response("Invalid request", { status: 400 });
    }

    let subject = "";
    let html = "";

    // Candidature
    if (record.desk_vise) {
      subject = `Nouvelle candidature Elite - ${record.prenom} ${record.nom}`;
      html = `
        <h2>Nouvelle candidature Elite 🎉</h2>
        <p><strong>${record.prenom} ${record.nom}</strong></p>
        <p>Email: ${record.email}</p>
        <p>Desk: ${record.desk_vise}</p>
        <p><a href="https://app.supabase.com">Voir sur Supabase</a></p>
      `;
    }
    // Message de contact
    else if (record.question) {
      subject = `Nouveau message de contact - ${record.prenom} ${record.nom}`;
      html = `
        <h2>Nouveau message 📬</h2>
        <p><strong>${record.prenom} ${record.nom}</strong></p>
        <p>Email: ${record.email}</p>
        <p>${record.question}</p>
      `;
    }

    if (!subject) {
      return new Response("No email to send", { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: NOTIFY_EMAIL,
        subject,
        html,
      }),
    });

    const data = await res.json();
    console.log("Resend response:", data);

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
