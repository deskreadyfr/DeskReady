import React from 'react'
import type { Asset } from '@/types/market'
import { ASSETS } from '@/data/market'

export default function CrossAssetPanel() {
  let lastCat = ''

  return (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[rgba(168,85,247,0.1)]">
        <div className="font-syne font-bold text-dr-white text-sm">Cross-Asset</div>
      </div>
      <div className="overflow-auto max-h-[520px]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[rgba(168,85,247,0.1)]">
              <th className="text-left text-xs font-semibold text-dr-grey uppercase tracking-wider px-4 py-2.5 bg-[rgba(255,255,255,0.02)]">Actif</th>
              <th className="text-right text-xs font-semibold text-dr-grey uppercase tracking-wider px-4 py-2.5 bg-[rgba(255,255,255,0.02)]">Valeur</th>
              <th className="text-right text-xs font-semibold text-dr-grey uppercase tracking-wider px-4 py-2.5 bg-[rgba(255,255,255,0.02)]">Variation</th>
            </tr>
          </thead>
          <tbody>
            {ASSETS.map((a: Asset, i: number) => {
              const showSep = a.cat !== lastCat
              if (showSep) lastCat = a.cat

              return (
                <React.Fragment key={`${a.name}-${i}`}>
                  {showSep && (
                    <tr className="border-b border-[rgba(168,85,247,0.06)]">
                      <td colSpan={3} className="px-4 py-1.5">
                        <span className="text-xs font-bold text-purple-glow uppercase tracking-widest">{a.cat}</span>
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-[rgba(168,85,247,0.05)] hover:bg-[rgba(124,58,237,0.05)] transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="text-dr-white text-xs font-medium">{a.name}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="text-dr-white text-xs font-semibold">{a.val}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: a.chg > 0 ? '#22c55e' : a.chg < 0 ? '#ef4444' : '#a09ab5' }}
                      >
                        {a.chgAbs}
                      </span>
                    </td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
