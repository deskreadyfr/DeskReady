import { KEY_LEVELS } from '@/data/market'

export default function LevelsPanel() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[rgba(168,85,247,0.1)]">
        <div className="font-syne font-bold text-dr-white text-sm">Niveaux Clés</div>
      </div>
      <div className="flex flex-col gap-0 divide-y divide-[rgba(168,85,247,0.06)]">
        {KEY_LEVELS.map((l, i) => (
          <div key={i} className="px-5 py-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-dr-white">{l.asset}</span>
              <span className="text-xs font-bold text-dr-white">{l.price}</span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-down">S {l.support}</span>
              <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${l.fill}%`,
                    background: 'linear-gradient(90deg, #ef4444, #a855f7)',
                  }}
                />
              </div>
              <span className="text-xs text-up">R {l.resist}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
