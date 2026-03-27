export const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  'Candidature envoyée': { color: '#6366f1', bg: 'rgba(99,102,241,0.12)', label: 'Envoyée' },
  'Call informationnel':  { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  label: 'Call Info' },
  '1er entretien':        { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',  label: '1er Entretien' },
  '2ème entretien':       { color: '#a855f7', bg: 'rgba(168,85,247,0.12)',  label: '2ème Entretien' },
  'Entretien final':      { color: '#c084fc', bg: 'rgba(192,132,252,0.12)', label: 'Final' },
  'Offre reçue':          { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   label: 'Offre ✓' },
  'Refusé':               { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    label: 'Refusé' },
  'En attente':           { color: '#64748b', bg: 'rgba(100,116,139,0.12)', label: 'En attente' },
}

export const PRIORITY_COLORS: Record<string, string> = {
  high: '#ef4444',
  mid: '#f59e0b',
  low: '#22c55e',
}

export const CONTRACT_TYPES = ['CDI', 'Stage', 'Freelance'] as const

export const LIMITED_QTY_ITEMS = ['Basic — Accès à vie', 'Gold — Accès à vie']

export const BLOG_CATEGORIES = [
  { key: 'all', label: 'Tous' },
  { key: 'technique', label: 'Technique' },
  { key: 'networking', label: 'Networking' },
  { key: 'entretien', label: 'Entretien' },
  { key: 'marche', label: 'Marchés' },
  { key: 'carriere', label: 'Carrière' },
]

export const TEMOIGNAGES = [
  { initials: 'AL', text: '"DeskReady m\'a donné la structure et le vocabulaire qui m\'ont permis de me démarquer dès le premier entretien chez SocGen. Le guide networking vaut à lui seul tout le programme."', name: 'Antoine L.', role: 'Sales FIC · Société Générale, Paris' },
  { initials: 'SC', text: '"J\'avais zéro réseau au départ. Grâce à la méthode DeskReady, j\'ai eu 12 calls informationnels en 3 semaines et une offre chez BNP Fixed Income. C\'est une autre approche."', name: 'Sofia C.', role: 'Fixed Income Sales · BNP Paribas, Paris' },
  { initials: 'MR', text: '"Le mock interview avec mon mentor m\'a permis d\'anticiper toutes les questions techniques. J\'ai eu le poste chez CACIB FX Structured Products que je visais depuis un an."', name: 'Mathieu R.', role: 'FX Structuré · Crédit Agricole CIB, Paris' },
  { initials: 'LB', text: '"En 4 semaines j\'ai transformé mon approche networking. Les templates de messages et la méthode de suivi m\'ont permis de décrocher un stage Sales Rates chez Deutsche Bank."', name: 'Lucas B.', role: 'Sales Rates · Deutsche Bank, Frankfurt' },
  { initials: 'CE', text: '"Les fiches techniques sur les produits dérivés m\'ont donné une crédibilité immédiate en entretien. J\'ai décroché mon summer chez Barclays dès la première vague."', name: 'Clara E.', role: 'Summer Analyst · Barclays, Londres' },
]
