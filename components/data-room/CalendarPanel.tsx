import { MACRO_CALENDAR } from '@/data/market'

const IMPACT_COLORS: Record<string, string> = {
  high: '#ef4444',
  mid: '#f59e0b',
  low: '#22c55e',
}

export default function CalendarPanel() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[rgba(168,85,247,0.1)]">
        <div className="font-syne font-bold text-dr-white text-sm">Calendrier Macro</div>
        <div className="text-xs text-dr-grey mt-0.5">Aujourd&apos;hui</div>
      </div>
      <div className="divide-y divide-[rgba(168,85,247,0.06)]">
        {MACRO_CALENDAR.map((e, i) => (
          <div key={i} className="flex items-start gap-4 px-5 py-3.5">
            <div className="text-xs text-dr-grey font-mono w-12 flex-shrink-0 pt-0.5">{e.time}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-base">{e.flag}</span>
                <span className="text-sm text-dr-white font-medium">{e.event}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: IMPACT_COLORS[e.impact] }}
                />
              </div>
              <div className="flex items-center gap-3 text-xs text-dr-grey">
                <span>Préc: <span className="text-dr-white">{e.prev}</span></span>
                <span>Cons: <span className="text-purple-glow">{e.cons}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
