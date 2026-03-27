'use client'
import { useCart } from '@/contexts/CartContext'
import { payStripe } from '@/lib/stripe'

interface OffreCardProps {
  tag: string
  name: string
  price?: number
  stripeKey?: string
  cartKey?: string
  desc: string
  features: string[]
  featured?: boolean
  onCandidature?: () => void
  cartLabel?: string
  payLabel?: string
  isCandidature?: boolean
}

function OffreCard({
  tag, name, price, stripeKey, cartKey, desc, features, featured,
  onCandidature, cartLabel = 'Ajouter au panier', payLabel, isCandidature
}: OffreCardProps) {
  const { add } = useCart()

  return (
    <div
      className="flex flex-col p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
      style={{
        background: featured ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.03)',
        borderColor: featured ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.15)',
      }}
    >
      <div
        className="inline-block text-xs font-semibold tracking-wider uppercase mb-4 px-3 py-1 rounded-full"
        style={{
          background: featured ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.15)',
          color: featured ? '#a855f7' : '#c084fc',
          border: `1px solid ${featured ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.2)'}`,
          width: 'fit-content',
        }}
      >
        {tag}
      </div>
      <div className="font-syne font-bold text-dr-white text-base mb-3">{name}</div>
      <p className="text-dr-grey text-sm leading-relaxed font-light mb-5">{desc}</p>
      <ul className="flex flex-col gap-2 mb-6 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-dr-white/80">
            <span className="text-purple-glow mt-0.5 flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 mt-auto">
        {isCandidature ? (
          <button
            onClick={onCandidature}
            className="w-full text-center text-sm py-2.5 px-4 rounded-lg border border-[rgba(168,85,247,0.3)] text-dr-white hover:border-purple-glow hover:bg-[rgba(124,58,237,0.1)] transition-all cursor-pointer bg-transparent"
          >
            Candidater →
          </button>
        ) : (
          <>
            {cartKey && price !== undefined && (
              <button
                onClick={() => add(cartKey, price)}
                className="w-full text-center text-sm py-2.5 px-4 rounded-lg border border-[rgba(168,85,247,0.3)] text-dr-white hover:border-purple-glow hover:bg-[rgba(124,58,237,0.1)] transition-all cursor-pointer bg-transparent"
              >
                {cartLabel}
              </button>
            )}
            {stripeKey && price !== undefined && (
              <button
                onClick={() => payStripe(stripeKey)}
                className="w-full text-center text-sm py-2.5 px-4 rounded-lg bg-purple-core text-dr-white hover:bg-purple-glow transition-all cursor-pointer border-none font-medium"
              >
                {payLabel || `Payer maintenant · ${price}€ →`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

interface Props {
  onCandidature: () => void
}

export default function Offres({ onCandidature }: Props) {
  const { add } = useCart()

  const formations = [
    {
      tag: 'Le + accessible',
      name: 'Basic · 199€ · Accès à vie',
      price: 199,
      stripeKey: 'basic',
      cartKey: 'Basic — Accès à vie',
      desc: "Pensée pour renforcer ses bases techniques et développer son réseau, destinée aux étudiants ayant déjà une première expérience en finance de marché.",
      features: [
        'Fiches sur la technique & le networking',
        '1 Review de CV',
        'Accès au groupe WhatsApp général',
        'Accès au groupe LinkedIn',
      ],
    },
    {
      tag: '⭐ Populaire',
      name: 'Gold · 399€ · Accès à vie',
      price: 399,
      stripeKey: 'gold',
      cartKey: 'Gold — Accès à vie',
      desc: "Idéale pour acquérir des bases solides en finance de marché et construire son réseau afin de décrocher un premier stage (césure, summer, fin d'études).",
      features: [
        'Fiches sur la technique & le networking',
        'Contacts certifiés pour candidatures spontanées',
        '2 Review de CV',
        '1 Entretien blanc',
        'Accès au groupe WhatsApp général',
        'Accès au groupe LinkedIn',
      ],
      featured: true,
    },
    {
      tag: 'Premium',
      name: 'Elite · 599€ · Accès à vie',
      desc: "Accès sur candidature uniquement. Conçu pour les candidats visant les desks les plus sélectifs.",
      features: [
        'Offre de stages exclusives',
        'Fiches sur la technique & le networking',
        'Contacts certifiés pour candidatures spontanées',
        '3 Entretiens blancs',
        '2 Sessions de coaching',
        "Accès aux groupes WhatsApp (Elite + Général)",
        'Accès au groupe LinkedIn',
        'Et bien + encore (Review CV & Linkedin)',
      ],
      isCandidature: true,
    },
  ]

  const alaCarte = [
    { name: 'Review de CV', price: 9, key: 'review_cv', cartKey: 'Review de CV', desc: 'Un retour détaillé sur ton CV par un professionnel du secteur.' },
    { name: 'Entretien blanc', price: 39, key: 'entretien_blanc', cartKey: 'Entretien blanc', desc: 'Une simulation d\'entretien réaliste avec feedback personnalisé.' },
    { name: 'Session de coaching', price: 29, key: 'session_coaching', cartKey: 'Session de coaching', desc: 'Un call stratégique pour définir ta roadmap et tes prochaines étapes.' },
    { name: 'Pack CV + Entretien', price: 45, key: 'pack_cv_entretien', cartKey: 'Pack CV + Entretien', desc: 'Une review de CV complète suivie d\'un entretien blanc pour maximiser tes chances.' },
    { name: 'Pack Entretien + Coaching', price: 55, key: 'pack_entretien_coaching', cartKey: 'Pack Entretien + Coaching', desc: 'Un entretien blanc suivi d\'une session de coaching pour affiner ta stratégie.' },
  ]

  return (
    <section id="offres" className="py-12 px-8 md:px-16 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-3">Ce qu&apos;on propose</div>
          <h2 className="font-syne font-bold text-dr-white text-3xl md:text-4xl leading-tight mb-4">
            Des offres pensées<br />pour chaque parcours
          </h2>
          <p className="text-dr-grey font-light max-w-lg mx-auto">Du premier contact avec le milieu jusqu&apos;à la préparation d&apos;un entretien.</p>
        </div>

        {/* Formations */}
        <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-6">Nos Formations</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {formations.map((f, i) => (
            <OffreCard key={i} {...f} onCandidature={onCandidature} />
          ))}
        </div>

        {/* À la carte */}
        <div>
          <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">À la carte</div>
          <p className="text-dr-grey font-light mb-8">Besoin d&apos;un coup de pouce rapide ?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alaCarte.map((item) => (
              <div
                key={item.key}
                className="flex flex-col p-6 rounded-2xl border border-[rgba(168,85,247,0.15)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(168,85,247,0.3)] transition-all hover:-translate-y-0.5"
              >
                <div className="font-syne font-bold text-dr-white whitespace-nowrap mb-1">{item.name}</div>
                <div className="font-syne font-extrabold text-purple-glow text-lg mb-3">{item.price}€</div>
                <p className="text-dr-grey text-sm font-light leading-relaxed mb-5 flex-1">{item.desc}</p>
                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    onClick={() => add(item.cartKey, item.price)}
                    className="w-full text-center text-sm py-2.5 px-4 rounded-lg border border-[rgba(168,85,247,0.3)] text-dr-white hover:border-purple-glow hover:bg-[rgba(124,58,237,0.1)] transition-all cursor-pointer bg-transparent"
                  >
                    Je veux
                  </button>
                  <button
                    onClick={() => payStripe(item.key)}
                    className="w-full text-center text-sm py-2.5 px-4 rounded-lg bg-purple-core text-dr-white hover:bg-purple-glow transition-all cursor-pointer border-none font-medium"
                  >
                    Payer · {item.price}€ →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
