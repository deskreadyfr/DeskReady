import type { Bank } from '@/types/banks'

export const BANKS: Bank[] = [
  {
    id: 'sgcib',
    name: 'Société Générale CIB',
    type: 'Banque universelle française',
    icon: '🔴',
    category: 'european',
    tags: ['FIC', 'FX', 'Rates', 'Credit', 'CEEMEA'],
    desc: 'Acteur majeur en Fixed Income et FX en Europe, avec une forte présence CEEMEA.',
    available: false,
    data: {}
  },
  {
    id: 'bnpp',
    name: 'BNP Paribas CIB',
    type: 'Banque universelle française',
    icon: '🟢',
    category: 'european',
    tags: ['FIC', 'Equity', 'Structured', 'FX'],
    desc: 'Première banque européenne par les actifs, avec une CIB très intégrée et reconnue mondialement.',
    available: false,
    data: {}
  },
  {
    id: 'cacib',
    name: 'Crédit Agricole CIB',
    type: 'Banque universelle française',
    icon: '🟡',
    category: 'european',
    tags: ['FX Structuré', 'Rates', 'Credit', 'Taux'],
    desc: 'Forte expertise en FX structuré et produits de taux. Culture sélective avec profils analytiques attendus.',
    available: false,
    data: {}
  },
  {
    id: 'gs',
    name: 'Goldman Sachs',
    type: 'Bulge Bracket américain',
    icon: '⚫',
    category: 'bulge',
    tags: ['Macro', 'FX', 'Rates', 'Sales & Trading'],
    desc: 'Référence mondiale du sell-side. Process rigoureux, culture analytique et high-performance.',
    available: false,
    data: {}
  },
  {
    id: 'jpmorgan',
    name: 'JP Morgan',
    type: 'Bulge Bracket américain',
    icon: '🔵',
    category: 'bulge',
    tags: ['Fixed Income', 'FX', 'Rates', 'Credit'],
    desc: "Leader mondial en fixed income et l'une des CIB les plus puissantes du marché.",
    available: false,
    data: {}
  },
  {
    id: 'barclays',
    name: 'Barclays',
    type: 'Bulge Bracket britannique',
    icon: '🦅',
    category: 'bulge',
    tags: ['Rates', 'Credit', 'FX', 'Structured'],
    desc: 'Acteur de premier plan en Rates et Credit en Europe, avec une culture analytique forte.',
    available: false,
    data: {}
  },
  {
    id: 'db',
    name: 'Deutsche Bank',
    type: 'Banque universelle allemande',
    icon: '🖤',
    category: 'european',
    tags: ['FX', 'Rates', 'EM', 'Credit'],
    desc: 'Forte présence en FX et Rates. Reconnue sur les marchés émergents et EMEA.',
    available: false,
    data: {}
  },
  {
    id: 'hsbc',
    name: 'HSBC',
    type: 'Banque internationale britannique',
    icon: '🔺',
    category: 'bulge',
    tags: ['Macro', 'EM', 'FX', 'Rates'],
    desc: 'Spécialiste des marchés émergents et des flux Asie-Europe. Forte culture Macro.',
    available: false,
    data: {}
  },
  {
    id: 'natixis',
    name: 'Natixis CIB',
    type: 'Banque universelle française',
    icon: '🟣',
    category: 'european',
    tags: ['Structured', 'Fixed Income', 'Real Assets'],
    desc: 'Expertise reconnue en structuration et real assets. Profils techniques appréciés.',
    available: false,
    data: {}
  },
]
