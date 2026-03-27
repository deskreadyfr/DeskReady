import type { Bank } from '@/types/banks'

interface Props {
  bank: Bank
  onClick: (id: string) => void
}

export default function BankCard({ bank, onClick }: Props) {
  return (
    <div
      className="flex flex-col bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-5 cursor-pointer hover:border-[rgba(168,85,247,0.4)] hover:bg-[rgba(124,58,237,0.06)] hover:-translate-y-1 transition-all"
      onClick={() => onClick(bank.id)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: 'rgba(124,58,237,0.15)' }}
        >
          {bank.icon}
        </div>
        <div>
          <div className="font-syne font-bold text-dr-white text-sm">{bank.name}</div>
          <div className="text-xs text-dr-grey">{bank.type}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {bank.tags.slice(0, 4).map(tag => (
          <span
            key={tag}
            className="inline-block bg-[rgba(124,58,237,0.15)] border border-[rgba(168,85,247,0.2)] text-purple-soft text-xs px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Desc */}
      <p className="text-dr-grey text-xs leading-relaxed font-light flex-1 mb-4">{bank.desc}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: bank.available ? '#22c55e' : '#a09ab5' }}
          />
          <span className="text-xs text-dr-grey">{bank.available ? 'Fiche disponible' : 'Bientôt'}</span>
        </div>
        <span className="text-dr-grey text-sm">→</span>
      </div>
    </div>
  )
}
