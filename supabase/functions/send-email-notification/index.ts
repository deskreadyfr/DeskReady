const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const NOTIFY_EMAIL = 'deskready.fr@gmail.com'

async function sendEmail(subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: NOTIFY_EMAIL,
      subject,
      html,
    }),
  })
  return res.json()
}

Deno.serve(async (req) => {
  try {
    const { record, type } = await req.json()

    if (type === 'INSERT') {
      if (record.desk_vise) {
        // Candidature Elite
        const html = `
          <h2>Nouvelle candidature Elite reçue! 🎉</h2>
          <p><strong>${record.nom}</strong></p>
          <p>Email: ${record.email}</p>
          <p>École: ${record.ecole || 'Non renseigné'}</p>
          <p>Année: ${record.annee || 'Non renseignée'}</p>
          <p>Desk visé: ${record.desk_vise}</p>
          <p>LinkedIn: ${record.linkedin_url || 'Non fourni'}</p>
          <p>Banques: ${record.banques_cibles || 'Non renseigné'}</p>
          <p>CV: ${record.cv_url || 'Non fourni'}</p>
          <hr/>
          <p>Parcours: ${record.parcours || ''}</p>
          <p>Motivation: ${record.motivation || ''}</p>
          <p><a href="https://supabase.com/dashboard/project/lysibziqgissumqszedk/editor">Voir sur Supabase →</a></p>
        `
        await sendEmail('Nouvelle candidature Elite - DeskReady', html)
      } else if (record.question) {
        // Message de contact
        const html = `
          <h2>Nouveau message de contact 📬</h2>
          <p><strong>${record.nom} ${record.prenom || ''}</strong></p>
          <p>Email: ${record.email}</p>
          <p><strong>Message:</strong></p>
          <p>${record.question}</p>
          <p><a href="https://supabase.com/dashboard/project/lysibziqgissumqszedk/editor">Voir sur Supabase →</a></p>
        `
        await sendEmail('Nouveau message de contact - DeskReady', html)
      }
    }

    return new Response('OK', { status: 200 })
  } catch (err) {
    console.error('send-email-notification error:', err)
    return new Response('Error', { status: 500 })
  }
})
