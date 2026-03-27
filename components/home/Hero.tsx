'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden"
    >
      {/* Orb */}
      <div
        className="absolute pointer-events-none animate-pulse-orb"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-55%, -55%)',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #7c3aed88, #a855f733 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[rgba(124,58,237,0.2)] border border-[rgba(168,85,247,0.4)] rounded-full px-4 py-1.5 text-purple-soft text-xs font-semibold tracking-widest uppercase mb-8 animate-fade-up">
        <span className="w-1.5 h-1.5 bg-purple-glow rounded-full animate-blink" />
        From School to the Desk
      </div>

      {/* Title */}
      <h1
        className="font-raleway font-black text-dr-white leading-none tracking-tight mb-6 animate-fade-up"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.03em', animationDelay: '0.15s' }}
      >
        La formation qui te prépare<br />
        <span className="text-purple-glow">vraiment aux desks de sales</span>
      </h1>

      {/* Sub */}
      <p
        className="text-dr-grey max-w-lg font-light leading-relaxed mb-10 animate-fade-up"
        style={{ fontSize: '1.05rem', animationDelay: '0.3s' }}
      >
        Networking, technique et codes de la salle des marchés — tout ce que l&apos;école ne t&apos;apprend pas, réuni dans une formation conçue par des professionnels du métier.
      </p>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center animate-fade-up" style={{ animationDelay: '0.45s' }}>
        <Link
          href="/#offres"
          className="bg-purple-core text-dr-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-purple-glow transition-all hover:-translate-y-0.5 inline-flex items-center gap-1"
        >
          Découvrir les offres →
        </Link>
      </div>

      {/* Banks carousel */}
      <div className="w-full mt-12 animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <p className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-6">Nos étudiants ont rejoint</p>
        <div
          className="overflow-hidden w-full rounded-xl py-2.5"
          style={{
            background: 'rgba(255,255,255,0.92)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="flex animate-scroll-banks" style={{ width: 'max-content' }}>
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center">
                {['BNP Paribas', 'SocGen', 'CACIB', 'HSBC', 'Goldman Sachs', 'JP Morgan', 'Deutsche Bank', 'Barclays', 'Natixis'].map((bank) => (
                  <div key={`${setIdx}-${bank}`} className="flex items-center justify-center px-10 h-12 flex-shrink-0">
                    <span className="font-syne font-bold text-sm" style={{ color: '#1a1a2e' }}>{bank}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
