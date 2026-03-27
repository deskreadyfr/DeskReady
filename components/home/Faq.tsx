'use client'
import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'À qui s\'adresse DeskReady ?',
    a: 'DeskReady est conçu pour les étudiants en école de commerce ou université qui visent un poste en finance de marché (Sales, Trading, Structuring). Que tu sois en M1, M2 ou en césure, nos formations s\'adaptent à ton niveau d\'avancement dans ta recherche de stage ou de premier emploi.',
  },
  {
    q: 'Quelle est la différence entre Basic, Gold et Elite ?',
    a: 'Le pack Basic couvre les fondamentaux : fiches techniques, networking et une review de CV. Le pack Gold ajoute des contacts certifiés pour candidatures spontanées et un entretien blanc. Le pack Elite est réservé aux profils les plus ambitieux — offres exclusives, plusieurs sessions de coaching, suivi intensif — il nécessite une candidature préalable.',
  },
  {
    q: "Combien de temps dure l'accompagnement ?",
    a: "Tous nos packs offrent un accès à vie aux contenus. L'accompagnement actif (reviews, entretiens blancs, sessions de coaching) est planifié avec toi selon ton calendrier de candidatures. En moyenne, nos membres décrochent une offre en 6 semaines à partir du premier contact.",
  },
  {
    q: 'Les contenus sont-ils adaptés aux profils sans expérience en finance ?',
    a: "Oui. Nos fiches techniques sont progressives et accessibles même si tu débutes. Le pack Basic est précisément pensé pour renforcer les bases. Si tu es complètement débutant, le call découverte gratuit te permettra de trouver la meilleure entrée dans le programme selon ton profil.",
  },
  {
    q: 'Comment fonctionne le réseau DeskReady ?',
    a: "En rejoignant DeskReady, tu accèdes à un groupe WhatsApp actif d'étudiants et de jeunes professionnels en finance de marché, ainsi qu'à un groupe LinkedIn. Les packs Gold et Elite incluent également des contacts certifiés — des professionnels en poste prêts à te recevoir en call informationnel — l'une des ressources les plus précieuses pour décrocher un stage dans ce secteur.",
  },
  {
    q: 'Est-il possible de payer en plusieurs fois ?',
    a: 'Nous proposons des facilités de paiement sur demande. Contacte-nous directement via le formulaire ou réserve un call découverte pour en discuter — on trouvera une solution adaptée à ta situation.',
  },
  {
    q: "Que se passe-t-il après mon achat ?",
    a: "Dès validation de ton paiement, tu reçois un email de confirmation avec un accès à la plateforme DeskReady. Un membre de l'équipe te contacte sous 24h pour planifier ton onboarding, faire le point sur ta situation et lancer ton accompagnement.",
  },
]

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="py-12 px-8 md:px-16 relative z-10"
      style={{ background: 'linear-gradient(180deg,transparent,rgba(124,58,237,0.04) 50%,transparent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-3">Questions fréquentes</div>
          <h2 className="font-syne font-bold text-dr-white text-3xl md:text-4xl leading-tight mb-4">
            On répond à<br /><span className="text-purple-glow">tes questions</span>
          </h2>
          <p className="text-dr-grey font-light max-w-lg mx-auto">Tout ce que tu veux savoir avant de rejoindre DeskReady.</p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: openIdx === i ? 'rgba(124,58,237,0.07)' : 'rgba(255,255,255,0.02)',
                borderColor: openIdx === i ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.15)',
              }}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-medium text-dr-white">{item.q}</span>
                <span
                  className="text-dr-grey transition-transform duration-200 flex-shrink-0 ml-4"
                  style={{ transform: openIdx === i ? 'rotate(90deg)' : 'none' }}
                >
                  →
                </span>
              </div>
              {openIdx === i && (
                <div className="px-5 pb-4 text-sm text-dr-grey leading-relaxed font-light">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
