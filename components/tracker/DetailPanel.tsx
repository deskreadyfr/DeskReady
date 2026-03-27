'use client'
import type { TrackerEntry } from '@/types/tracker'
import { STATUS_CONFIG, PRIORITY_COLORS } from '@/lib/constants'

interface Props {
  entry: TrackerEntry | null
  onClose: () => void
  onEdit: (id: string) => void
}

export default function DetailPanel({ entry, onClose, onEdit }: Props) {
  if (!entry) return null

  const sc = STATUS_CONFIG[entry.status] || STATUS_CONFIG['En attente']

  return (
    <div
      className="fixed inset-0 z-40 flex items-end md:items-center justify-end bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full md:w-[420px] h-full md:h-auto bg-[#0d0d14] border-l md:border border-[rgba(168,85,247,0.2)] md:rounded-2xl p-7 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-syne font-bold text-dr-white text-lg">{entry.bank}</h3>
            <p className="text-dr-grey text-sm mt-0.5">{entry.desk} · {entry.type || 'Stage'}</p>
          </div>
          <button onClick={onClose} className="text-dr-grey hover:text-dr-white bg-transparent border-none cursor-pointer text-xl ml-4">✕</button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Status */}
          <div>
            <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-2">Statut actuel</div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}30` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
              {entry.status}
            </span>
          </div>

          {/* Priority */}
          <div>
            <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-2">Priorité</div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: PRIORITY_COLORS[entry.priority || 'mid'] }} />
              <span className="text-sm text-dr-white capitalize">{entry.priority === 'high' ? 'Haute' : entry.priority === 'mid' ? 'Moyenne' : 'Faible'}</span>
            </div>
          </div>

          {/* Dates */}
          {entry.date && (
            <div>
              <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-2">Date de candidature</div>
              <div className="text-sm text-dr-white">{new Date(entry.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          )}

          {entry.followup && (
            <div>
              <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-2">Prochain rappel</div>
              <div className="text-sm text-dr-white">{new Date(entry.followup).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          )}

          {entry.contact && (
            <div>
              <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-2">Contact</div>
              <div className="text-sm text-dr-white">{entry.contact}</div>
            </div>
          )}

          {entry.notes && (
            <div>
              <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-2">Notes</div>
              <div className="text-sm text-dr-grey leading-relaxed whitespace-pre-wrap bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.1)] rounded-xl p-4">{entry.notes}</div>
            </div>
          )}

          <button
            onClick={() => { onEdit(entry.id); onClose() }}
            className="w-full py-3 rounded-xl bg-[rgba(124,58,237,0.15)] border border-[rgba(168,85,247,0.3)] text-dr-white text-sm font-medium hover:bg-[rgba(124,58,237,0.25)] hover:border-purple-glow cursor-pointer transition-all mt-2"
          >
            ✏ Modifier cette candidature
          </button>
        </div>
      </div>
    </div>
  )
}
