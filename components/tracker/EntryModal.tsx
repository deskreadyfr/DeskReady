'use client'
import { useState, useEffect } from 'react'
import type { TrackerEntry } from '@/types/tracker'
import { STATUS_CONFIG, PRIORITY_COLORS } from '@/lib/constants'
import { generateId } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (entry: TrackerEntry) => void
  editing?: TrackerEntry | null
}

const STATUS_OPTIONS = Object.keys(STATUS_CONFIG)
const TYPE_OPTIONS = ['Stage', 'CDI', 'Freelance', 'Alternance']

export default function EntryModal({ open, onClose, onSave, editing }: Props) {
  const [form, setForm] = useState<Partial<TrackerEntry>>({
    bank: '', desk: '', status: 'Candidature envoyée', type: 'Stage',
    priority: 'mid', date: new Date().toISOString().split('T')[0],
    contact: '', followup: '', notes: '',
  })

  useEffect(() => {
    if (editing) {
      setForm(editing)
    } else {
      setForm({
        bank: '', desk: '', status: 'Candidature envoyée', type: 'Stage',
        priority: 'mid', date: new Date().toISOString().split('T')[0],
        contact: '', followup: '', notes: '',
      })
    }
  }, [editing, open])

  function handleSave() {
    if (!form.bank?.trim() || !form.desk?.trim()) {
      alert('Banque et desk sont obligatoires.')
      return
    }
    onSave({
      id: editing?.id || generateId(),
      bank: form.bank!,
      desk: form.desk!,
      status: form.status || 'Candidature envoyée',
      type: form.type || 'Stage',
      priority: form.priority || 'mid',
      date: form.date,
      followup: form.followup,
      contact: form.contact,
      notes: form.notes,
      updatedAt: new Date().toISOString(),
    })
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0d0d14] border border-[rgba(168,85,247,0.2)] rounded-2xl p-7 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-syne font-bold text-dr-white text-lg">
            {editing ? 'Modifier la candidature' : 'Nouvelle candidature'}
          </h3>
          <button onClick={onClose} className="text-dr-grey hover:text-dr-white bg-transparent border-none cursor-pointer text-xl">✕</button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Bank + Desk */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Banque *</label>
              <input
                value={form.bank || ''}
                onChange={e => setForm(f => ({ ...f, bank: e.target.value }))}
                placeholder="Goldman Sachs"
              />
            </div>
            <div>
              <label>Desk *</label>
              <input
                value={form.desk || ''}
                onChange={e => setForm(f => ({ ...f, desk: e.target.value }))}
                placeholder="Sales FX"
              />
            </div>
          </div>

          {/* Status + Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Statut</label>
              <select value={form.status || ''} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label>Type</label>
              <select value={form.type || ''} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Date de candidature</label>
              <input type="date" value={form.date || ''} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label>Date de rappel</label>
              <input type="date" value={form.followup || ''} onChange={e => setForm(f => ({ ...f, followup: e.target.value }))} />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label>Priorité</label>
            <div className="flex gap-2">
              {(['high', 'mid', 'low'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setForm(f => ({ ...f, priority: p }))}
                  className="flex-1 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all"
                  style={{
                    background: form.priority === p ? `${PRIORITY_COLORS[p]}20` : 'rgba(255,255,255,0.03)',
                    borderColor: form.priority === p ? PRIORITY_COLORS[p] : 'rgba(168,85,247,0.15)',
                    color: form.priority === p ? PRIORITY_COLORS[p] : '#a09ab5',
                  }}
                >
                  {p === 'high' ? 'Haute' : p === 'mid' ? 'Moyenne' : 'Faible'}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <label>Contact</label>
            <input
              value={form.contact || ''}
              onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
              placeholder="Prénom Nom ou LinkedIn"
            />
          </div>

          {/* Notes */}
          <div>
            <label>Notes</label>
            <textarea
              rows={3}
              value={form.notes || ''}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Observations, étapes, notes..."
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-[rgba(168,85,247,0.2)] text-dr-grey hover:text-dr-white hover:border-[rgba(168,85,247,0.4)] cursor-pointer bg-transparent transition-colors text-sm"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-lg bg-purple-core text-white hover:bg-purple-glow cursor-pointer border-none transition-colors text-sm font-medium"
            >
              {editing ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
