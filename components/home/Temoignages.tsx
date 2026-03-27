'use client'
import { useState, useEffect, useRef } from 'react'
import { TEMOIGNAGES } from '@/lib/constants'

export default function Temoignages() {
  const [idx, setIdx] = useState(0)
  const [locked, setLocked] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const N = TEMOIGNAGES.length
  const VISIBLE = 3

  function getCardWidth() {
    if (!trackRef.current) return 0
    const card = trackRef.current.querySelector('[data-card]') as HTMLElement
    if (!card) return 0
    return card.offsetWidth + 24
  }

  function setPosition(index: number, animate: boolean) {
    if (!trackRef.current) return
    if (!animate) trackRef.current.style.transition = 'none'
    else trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)'
    trackRef.current.style.transform = `translateX(-${(VISIBLE + index) * getCardWidth()}px)`
    if (!animate) {
      void trackRef.current.offsetWidth
      trackRef.current.style.transition = ''
    }
  }

  useEffect(() => {
    setPosition(0, false)
  }, [])

  function move(dir: number) {
    if (locked) return
    setLocked(true)
    const newIdx = idx + dir
    const track = trackRef.current
    if (!track) return

    if (newIdx >= N) {
      setPosition(N, true)
      track.addEventListener('transitionend', () => {
        setIdx(0)
        setPosition(0, false)
        setLocked(false)
      }, { once: true })
      return
    }
    if (newIdx < 0) {
      setPosition(-1, true)
      track.addEventListener('transitionend', () => {
        setIdx(N - 1)
        setPosition(N - 1, false)
        setLocked(false)
      }, { once: true })
      return
    }
    setIdx(newIdx)
    setPosition(newIdx, true)
    track.addEventListener('transitionend', () => setLocked(false), { once: true })
  }

  // Build infinite clone array: last VISIBLE + all + first VISIBLE
  const clones = [
    ...TEMOIGNAGES.slice(N - VISIBLE),
    ...TEMOIGNAGES,
    ...TEMOIGNAGES.slice(0, VISIBLE),
  ]

  return (
    <section id="temoignages" className="py-12 px-8 md:px-16 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-3">Ils l&apos;ont fait</div>
          <h2 className="font-syne font-bold text-dr-white text-3xl md:text-4xl leading-tight mb-4">
            Ce qu&apos;en disent<br />nos membres
          </h2>
          <p className="text-dr-grey font-light max-w-lg mx-auto">Des étudiants qui étaient exactement à ta place, aujourd&apos;hui sur des desks top-tier.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={() => move(-1)}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-[rgba(168,85,247,0.3)] bg-[rgba(124,58,237,0.1)] text-dr-white hover:border-purple-glow hover:bg-[rgba(124,58,237,0.2)] transition-all cursor-pointer text-lg"
          >
            ←
          </button>

          {/* Track wrapper */}
          <div className="flex-1 overflow-hidden">
            <div ref={trackRef} className="flex gap-6" style={{ width: 'max-content' }}>
              {clones.map((t, i) => (
                <div
                  key={i}
                  data-card
                  className="w-72 flex-shrink-0 bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-6 hover:border-[rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all"
                >
                  <div className="text-purple-glow text-sm tracking-wider mb-4">★★★★★</div>
                  <p className="text-dr-white/80 text-sm italic leading-relaxed font-light mb-5">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-dr-white font-bold text-sm flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #3b0764, #7c3aed)' }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-dr-white">{t.name}</div>
                      <div className="text-xs text-dr-grey">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {TEMOIGNAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (!locked) { setIdx(i); setPosition(i, true) } }}
                  className="transition-all duration-200 rounded-full border-none cursor-pointer"
                  style={{
                    width: i === idx ? 20 : 8,
                    height: 8,
                    background: i === idx ? '#a855f7' : 'rgba(160,154,181,0.3)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => move(1)}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-[rgba(168,85,247,0.3)] bg-[rgba(124,58,237,0.1)] text-dr-white hover:border-purple-glow hover:bg-[rgba(124,58,237,0.2)] transition-all cursor-pointer text-lg"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
