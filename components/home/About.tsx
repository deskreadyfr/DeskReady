import Link from 'next/link'

export default function About() {
  return (
    <>
      {/* À propos */}
      <section id="apropos" className="py-12 px-8 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-4">Notre Histoire</div>
              <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-6">
                <div className="font-syne font-bold text-dr-white text-base mb-1">A&C — Les Deux Fondateurs</div>
                <div className="text-dr-grey text-xs mb-4">Anciens étudiants d&apos;école de commerce · Aujourd&apos;hui Sales sur des desks FICC</div>
                <p className="text-dr-grey text-sm leading-relaxed font-light mb-3">
                  Nous sommes passés par le même parcours que beaucoup d&apos;étudiants intéressés par la finance de marché. En cherchant à rejoindre un desk en stage ou en CDI, nous avons rapidement constaté un décalage entre les formations académiques et les attentes réelles du secteur.
                </p>
                <p className="text-dr-grey text-sm leading-relaxed font-light mb-3">
                  Les connaissances techniques sont importantes, mais ce sont souvent les codes du milieu, le networking et la compréhension des attentes des desks qui font la différence.
                </p>
                <p className="text-dr-grey text-sm leading-relaxed font-light mb-3">
                  Avec DeskReady, nous avons voulu créer la plateforme que nous aurions aimé avoir à l&apos;époque : un endroit pour comprendre le secteur, structurer sa stratégie et se préparer efficacement aux opportunités en salle de marché.
                </p>
                <p className="text-dr-grey text-sm leading-relaxed font-light">
                  Notre objectif est simple : aider les étudiants à gagner du temps, éviter les erreurs les plus courantes et aborder les processus de recrutement avec une stratégie claire.
                </p>
              </div>
            </div>
            <div>
              <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-4">Notre mission</div>
              <h2 className="font-syne font-bold text-dr-white text-2xl md:text-3xl leading-tight mb-5">
                Vous rendre opérationnel dès votre arrivée sur le desk
              </h2>
              <p className="text-dr-grey font-light text-sm leading-relaxed mb-4">
                Les marchés restent un univers exigeant, difficile à pénétrer et largement fondé sur le réseau. Pourtant, les formations académiques préparent rarement aux réalités concrètes des desks.
              </p>
              <p className="text-dr-grey font-light text-sm leading-relaxed mb-4">
                DeskReady a été créé pour combler cet écart. Notre objectif : t&apos;apporter les connaissances pratiques, les codes et les méthodes qui font réellement la différence lorsqu&apos;il s&apos;agit de décrocher un stage sur un desk.
              </p>
              <p className="text-dr-grey font-light text-sm leading-relaxed mb-8">
                Au-delà de la théorie, nous transmettons une approche, un réseau et une compréhension concrète du fonctionnement des desks.
              </p>
              <Link
                href="#offres"
                className="inline-flex items-center bg-purple-core text-dr-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-purple-glow transition-colors"
              >
                Voir les offres →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section id="pourquoi" className="py-12 px-8 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-4">Pourquoi DeskReady ?</div>
              <h2 className="font-syne font-bold text-dr-white text-2xl md:text-3xl leading-tight mb-4" style={{ whiteSpace: 'nowrap' }}>
                Un milieu compétitif aux codes précis
              </h2>
              <p className="text-dr-grey font-light text-sm mb-8">Maîtriser la technique ne suffit pas : il faut aussi comprendre les codes du milieu.</p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: '🎓', title: 'Fait par des professionnels du milieu', desc: 'Une formation conçue par des professionnels qui connaissent les attentes des desks.' },
                  { icon: '🔗', title: 'Le réseau, au cœur de tout', desc: "On t'apprend à networker intelligemment et à approcher les professionnels du secteur de la bonne manière." },
                  { icon: '⚡', title: 'Des bases techniques solides', desc: 'Comprendre les produits, les marchés et les mécanismes clés pour être crédible dès tes premiers échanges avec des professionnels.' },
                ].map((v, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="text-2xl flex-shrink-0">{v.icon}</div>
                    <div>
                      <div className="font-semibold text-dr-white text-sm mb-1">{v.title}</div>
                      <div className="text-dr-grey text-sm font-light leading-relaxed">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '100%', label: 'de nos membres décrochent un stage en finance de marché avec notre accompagnement' },
                { num: '+15', label: 'banques représentées dans notre réseau d\'élèves' },
                { num: '6', label: 'semaines en moyenne du premier contact à l\'offre' },
                { num: '100%', label: 'des contenus rédigés par des professionnels en activité' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-5"
                >
                  <div className="font-syne font-extrabold text-purple-glow text-2xl mb-2">{s.num}</div>
                  <div className="text-dr-grey text-xs leading-relaxed font-light">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
