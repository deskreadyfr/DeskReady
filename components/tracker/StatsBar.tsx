import type { TrackerEntry } from '@/types/tracker'

interface Props {
  data: TrackerEntry[]
}

export default function StatsBar({ data }: Props) {
  const total = data.length
  const active = data.filter(d => !['Offre reçue', 'Refusé'].includes(d.status)).length
  const offers = data.filter(d => d.status === 'Offre reçue').length
  const interviews = data.filter(d => ['1er entretien', '2ème entretien', 'Entretien final'].includes(d.status)).length
  const calls = data.filter(d => d.status === 'Call informationnel').length

  const stats = [
    { num: total, label: 'Total candidatures', color: '#a855f7' },
    { num: active, label: 'En cours', color: '#6366f1' },
    { num: calls, label: 'Calls info', color: '#f59e0b' },
    { num: interviews, label: 'Entretiens', color: '#8b5cf6' },
    { num: offers, label: 'Offres reçues', color: '#22c55e' },
  ]

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.1)] rounded-xl px-4 py-2.5"
        >
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
          <div>
            <div className="font-syne font-bold text-dr-white text-lg leading-none">{s.num}</div>
            <div className="text-dr-grey text-xs mt-0.5">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
