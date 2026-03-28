const { createClient } = require('@supabase/supabase-js');
const formidable = require('formidable');
const fs = require('fs');

const supabase = createClient(
  'https://lysibziqgissumqszedk.supabase.co',
  process.env.SUPABASE_SERVICE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c2liemlxZ2lzc3VtcXN6ZWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5OTA4MzcsImV4cCI6MjA4ODU2NjgzN30.3M85rhh4AltDZnm743ntap6_j9T1wApOiNkELLvC9hs'
);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const form = formidable({ multiples: false });
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const cvFile = files.cvFile;
    if (!cvFile) return res.status(400).json({ error: 'Fichier CV manquant' });

    // Support formidable v2 (array) and v3 (direct)
    const file = Array.isArray(cvFile) ? cvFile[0] : cvFile;
    const get = (f) => { const v = fields[f]; return Array.isArray(v) ? v[0] : (v || ''); };

    const fileBuffer = fs.readFileSync(file.filepath);
    const ext = (file.originalFilename || 'cv').split('.').pop();
    const fileName = `${Date.now()}_${get('email').replace(/[^a-z0-9]/gi, '_')}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from('candidatures')
      .upload(fileName, fileBuffer, { contentType: file.mimetype || 'application/pdf' });

    if (uploadErr) throw uploadErr;

    const cv_url = supabase.storage.from('candidatures').getPublicUrl(fileName).data.publicUrl;

    const { error: dbErr } = await supabase.from('candidatures').insert([{
      nom: get('nom'),
      email: get('email'),
      telephone: get('telephone'),
      ecole: get('ecole'),
      annee: get('annee'),
      desk_vise: get('desk_vise'),
      linkedin_url: get('linkedin_url'),
      banques_cibles: get('banques_cibles'),
      parcours: get('parcours'),
      motivation: get('motivation'),
      cv_url,
      status: 'pending',
      created_at: new Date().toISOString(),
    }]);

    if (dbErr) throw dbErr;

    return res.status(200).json({ success: true, cv_url, message: 'Candidature envoyée' });
  } catch (error) {
    console.error('Erreur upload-candidature:', error);
    return res.status(500).json({ error: error.message });
  }
};
