'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TickerBar from '@/components/data-room/TickerBar'
import CrossAssetPanel from '@/components/data-room/CrossAssetPanel'
import NewsPanel from '@/components/data-room/NewsPanel'
import CalendarPanel from '@/components/data-room/CalendarPanel'
import LevelsPanel from '@/components/data-room/LevelsPanel'

export default function DataRoomPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        {/* Ticker */}
        <TickerBar />

        <div className="max-w-[1300px] mx-auto px-8 py-10 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Ressources</div>
            <h1 className="font-raleway font-black text-dr-white text-3xl md:text-4xl leading-tight mb-2" style={{ letterSpacing: '-0.03em' }}>
              Data Room
            </h1>
            <p className="text-dr-grey text-sm font-light">Marchés en temps réel · Actualités · Calendrier macro · Niveaux clés</p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-center gap-3 bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-xl px-4 py-3 mb-8">
            <span className="text-sm">⚠️</span>
            <p className="text-xs text-dr-grey">
              <strong className="text-dr-white">Données indicatives uniquement.</strong> Les valeurs affichées sont statiques et peuvent ne pas refléter les cours en temps réel. Ne pas utiliser à des fins d&apos;investissement.
            </p>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              <CrossAssetPanel />
              <NewsPanel />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              <CalendarPanel />
              <LevelsPanel />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
