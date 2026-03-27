'use client'
import type { TrackerEntry } from '@/types/tracker'
import { STATUS_CONFIG, PRIORITY_COLORS } from '@/lib/constants'

interface Props {
  data: TrackerEntry[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSelect: (id: string) => void
}

export default function TrackerTable({ data, onEdit, onDelete, onSelect }: Props) {
  const today = new Date().toISOString().split('T')[0]

  if (data.length === 0) {
    return (
      <div className="text-center py-20 text-dr-grey">
        <div className="text-4xl mb-4">🔍</div>
        <div className="font-syne font-bold text-base mb-2">Aucun résultat</div>
        <div className="text-sm">Modifie tes filtres pour afficher plus de candidatures.</div>
      </div>
    )
  }

  const sorted = [...data].sort((a, b) => {
    const prio: Record<string, number> = { high: 0, mid: 1, low: 2 }
    return (prio[a.priority || 'mid'] ?? 1) - (prio[b.priority || 'mid'] ?? 1)
  })

  return (
    <div className="overflow-x-auto rounded-xl border border-[rgba(168,85,247,0.15)]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[rgba(168,85,247,0.15)]">
            {['Banque / Desk', 'Statut', 'Type', 'Date', 'Rappel', 'Contact', 'Priorité', ''].map((h, i) => (
              <th
                key={i}
                className="text-left text-xs font-semibold text-dr-grey uppercase tracking-wider px-4 py-3 bg-[rgba(255,255,255,0.02)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(d => {
            const sc = STATUS_CONFIG[d.status] || STATUS_CONFIG['En attente']
            const isOverdue = d.followup && d.followup < today && !['Offre reçue', 'Refusé'].includes(d.status)

            return (
              <tr
                key={d.id}
                className="border-b border-[rgba(168,85,247,0.08)] hover:bg-[rgba(124,58,237,0.05)] cursor-pointer transition-colors group"
                onClick={() => onSelect(d.id)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: 'rgba(124,58,237,0.15)' }}
                    >
                      🏦
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-dr-white">{d.bank}</div>
                      <div className="text-xs text-dr-grey">{d.desk}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}30` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-dr-grey">{d.type || 'Stage'}</td>
                <td className="px-4 py-3 text-xs text-dr-grey">
                  {d.date ? new Date(d.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : '—'}
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: isOverdue ? '#ef4444' : '#a09ab5' }}>
                  {d.followup
                    ? new Date(d.followup).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) + (isOverdue ? ' ⚠' : '')
                    : '—'}
                </td>
                <td className="px-4 py-3 text-xs text-dr-grey">{d.contact || '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: PRIORITY_COLORS[d.priority || 'mid'] }}
                  />
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onEdit(d.id)}
                      className="text-xs text-dr-grey hover:text-dr-white bg-[rgba(124,58,237,0.1)] hover:bg-[rgba(124,58,237,0.25)] px-2 py-1 rounded cursor-pointer border-none transition-colors"
                    >
                      ✏
                    </button>
                    <button
                      onClick={() => onDelete(d.id)}
                      className="text-xs text-dr-grey hover:text-down bg-[rgba(239,68,68,0.05)] hover:bg-[rgba(239,68,68,0.15)] px-2 py-1 rounded cursor-pointer border-none transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
