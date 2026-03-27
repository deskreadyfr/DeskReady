import { ASSETS } from '@/data/market'

export default function TickerBar() {
  const items = [...ASSETS, ...ASSETS]

  return (
    <div
      className="w-full overflow-hidden border-b border-[rgba(168,85,247,0.15)] py-2"
      style={{ background: 'rgba(13,13,20,0.9)' }}
    >
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {items.map((a, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-xs">
            <span className="text-dr-white font-semibold">{a.name}</span>
            <span className="text-dr-grey">{a.val}</span>
            <span style={{ color: a.chg > 0 ? '#22c55e' : a.chg < 0 ? '#ef4444' : '#a09ab5' }}>
              {a.chgAbs}
            </span>
            <span className="text-[rgba(168,85,247,0.3)] mx-1">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
