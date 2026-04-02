import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const TEAM_EMAIL = 'deskready.fr@gmail.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { token, filePath, fileName } = await req.json();

    // [1] Token missing
    if (!token) {
      return new Response(JSON.stringify({ error: '[1] Token manquant' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // [2] Verify user
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: `[2] Auth failed: ${authError?.message}` }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const userId = user.id;
    console.log('[submit-cv] user verified:', userId);

    // [3] Check purchase — use maybeSingle() to avoid crash when 0 or multiple rows
    const { data: purchase, error: dbError } = await supabase
      .from('user_purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .in('product_name', ['CV Review', 'Pack CV + Entretien'])
      .limit(1)
      .maybeSingle();

    if (dbError) {
      return new Response(JSON.stringify({ error: `[3] DB error: ${dbError.message}` }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // [4] No purchase found
    if (!purchase) {
      return new Response(JSON.stringify({ error: `[4] Aucun achat trouvé pour user ${userId}` }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('[submit-cv] purchase confirmed for user:', userId);

    // [5] Generate signed URL for the uploaded file
    let signedUrl = '';
    try {
      const { data: urlData, error: urlError } = await supabase.storage
        .from('cv-reviews')
        .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days
      if (urlError) throw urlError;
      signedUrl = urlData.signedUrl;
    } catch (e: any) {
      console.error('[submit-cv] signed URL error:', e.message);
      // Non-blocking — still send email with file path as fallback
    }

    // [6] Send email notification
    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: [TEAM_EMAIL],
            subject: `Nouveau CV à reviewer — ${fileName}`,
            html: `
              <p>Un utilisateur a soumis son CV pour review.</p>
              <ul>
                <li><strong>User ID :</strong> ${userId}</li>
                <li><strong>Email :</strong> ${user.email}</li>
                <li><strong>Fichier :</strong> ${fileName}</li>
                <li><strong>Chemin :</strong> ${filePath}</li>
              </ul>
              ${signedUrl ? `<p><a href="${signedUrl}">Télécharger le CV (valable 7 jours)</a></p>` : ''}
            `,
          }),
        });
        console.log('[submit-cv] email sent');
      } catch (e: any) {
        console.error('[submit-cv] email error:', e.message);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (e: any) {
    console.error('[submit-cv] exception:', e);
    return new Response(JSON.stringify({ error: `[5] Exception: ${e.message}` }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
