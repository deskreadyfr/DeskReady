'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StatsBar from '@/components/tracker/StatsBar'
import TrackerTable from '@/components/tracker/TrackerTable'
import EntryModal from '@/components/tracker/EntryModal'
import DetailPanel from '@/components/tracker/DetailPanel'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { TrackerEntry } from '@/types/tracker'
import { STATUS_CONFIG } from '@/lib/constants'

export default function CareerTrackerPage() {
  const [data, setData] = useLocalStorage<TrackerEntry[]>('dr_tracker_v1', [])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<TrackerEntry | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = data.filter(d => {
    const q = search.toLowerCase()
    const matchQ = !q || d.bank.toLowerCase().includes(q) || d.desk.toLowerCase().includes(q) || (d.contact || '').toLowerCase().includes(q)
    const matchStatus = filterStatus === 'all' || d.status === filterStatus
    const matchType = filterType === 'all' || d.type === filterType
    return matchQ && matchStatus && matchType
  })

  function openAdd() {
    setEditingEntry(null)
    setModalOpen(true)
  }

  function openEdit(id: string) {
    const e = data.find(d => d.id === id)
    if (e) { setEditingEntry(e); setModalOpen(true) }
  }

  function handleSave(entry: TrackerEntry) {
    setData(prev => {
      const idx = prev.findIndex(d => d.id === entry.id)
      if (idx !== -1) {
        const next = [...prev]
        next[idx] = entry
        return next
      }
      return [entry, ...prev]
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Supprimer cette candidature ?')) return
    setData(prev => prev.filter(d => d.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const selectedEntry = selectedId ? data.find(d => d.id === selectedId) || null : null

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <div className="max-w-[1200px] mx-auto px-8 py-12 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Ressources</div>
              <h1 className="font-raleway font-black text-dr-white text-3xl md:text-4xl leading-tight mb-2" style={{ letterSpacing: '-0.03em' }}>
                Career Tracker
              </h1>
              <p className="text-dr-grey text-sm font-light">Suis tes candidatures en temps réel, ne laisse rien passer.</p>
            </div>
            <button
              onClick={openAdd}
              className="bg-purple-core text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-glow transition-colors cursor-pointer border-none flex items-center gap-2"
            >
              <span>+</span> Nouvelle candidature
            </button>
          </div>

          {/* Stats */}
          <StatsBar data={data} />

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-5">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une banque, desk..."
              className="w-56"
            />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-44">
              <option value="all">Tous les statuts</option>
              {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-36">
              <option value="all">Tous les types</option>
              <option value="Stage">Stage</option>
              <option value="CDI">CDI</option>
              <option value="Freelance">Freelance</option>
              <option value="Alternance">Alternance</option>
            </select>
          </div>

          {/* Empty state */}
          {data.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🎯</div>
              <div className="font-syne font-bold text-dr-white text-xl mb-2">Aucune candidature encore</div>
              <div className="text-dr-grey text-sm mb-6">Commence à tracker tes démarches pour ne rien oublier.</div>
              <button
                onClick={openAdd}
                className="bg-purple-core text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-purple-glow transition-colors cursor-pointer border-none"
              >
                + Ajouter ma première candidature
              </button>
            </div>
          ) : (
            <TrackerTable
              data={filtered}
              onEdit={openEdit}
              onDelete={handleDelete}
              onSelect={id => setSelectedId(selectedId === id ? null : id)}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <EntryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editing={editingEntry}
      />
      <DetailPanel
        entry={selectedEntry}
        onClose={() => setSelectedId(null)}
        onEdit={id => { openEdit(id); setSelectedId(null) }}
      />

      <Footer />
    </>
  )
}
