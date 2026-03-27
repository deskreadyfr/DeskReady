'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BankCard from '@/components/banques/BankCard'
import BankModal from '@/components/banques/BankModal'
import { BANKS } from '@/data/banks'
import type { Bank } from '@/types/banks'

const FILTERS = [
  { key: 'all', label: 'Toutes' },
  { key: 'bulge', label: 'Bulge Bracket' },
  { key: 'european', label: 'Banques européennes' },
]

export default function BanquesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openBank, setOpenBank] = useState<Bank | null>(null)

  const filtered = BANKS.filter(b => {
    const matchFilter = activeFilter === 'all' || b.category === activeFilter
    const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchFilter && matchSearch
  })

  function handleOpenModal(id: string) {
    const bank = BANKS.find(b => b.id === id)
    if (bank) setOpenBank(bank)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <div className="max-w-[1200px] mx-auto px-8 py-12 relative z-10">
          {/* Header */}
          <div className="mb-10">
            <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Ressources</div>
            <h1 className="font-raleway font-black text-dr-white text-3xl md:text-4xl leading-tight mb-2" style={{ letterSpacing: '-0.03em' }}>
              Fiches Banques
            </h1>
            <p className="text-dr-grey text-sm font-light">Desks, culture, process de recrutement — tout ce qu&apos;il faut savoir avant de postuler.</p>
          </div>

          {/* Filters + Search */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border cursor-pointer transition-all"
                  style={{
                    background: activeFilter === f.key ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                    borderColor: activeFilter === f.key ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.15)',
                    color: activeFilter === f.key ? '#f8f4ff' : '#a09ab5',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher une banque, desk..."
              className="w-64"
            />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🏦</div>
              <div className="font-syne font-bold text-dr-white text-xl mb-2">Aucune banque trouvée</div>
              <div className="text-dr-grey text-sm">Essaie un autre terme de recherche.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(bank => (
                <BankCard key={bank.id} bank={bank} onClick={handleOpenModal} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BankModal bank={openBank} onClose={() => setOpenBank(null)} />
      <Footer />
    </>
  )
}
