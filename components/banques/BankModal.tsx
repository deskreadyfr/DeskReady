'use client'
import type { Bank } from '@/types/banks'

interface Props {
  bank: Bank | null
  onClose: () => void
}

export default function BankModal({ bank, onClose }: Props) {
  if (!bank) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0d0d14] border border-[rgba(168,85,247,0.2)] rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[rgba(168,85,247,0.1)]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(124,58,237,0.15)' }}
            >
              {bank.icon}
            </div>
            <div>
              <div className="font-syne font-bold text-dr-white">{bank.name}</div>
              <div className="text-xs text-dr-grey">{bank.type}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-dr-grey hover:text-dr-white bg-transparent border-none cursor-pointer text-xl">✕</button>
        </div>

        {/* Body */}
        <div className="p-7">
          {!bank.available ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-4">✍️</div>
              <div className="font-syne font-bold text-dr-white text-lg mb-3">Fiche en cours de rédaction</div>
              <div className="text-dr-grey text-sm leading-relaxed">
                La fiche détaillée de {bank.name} sera disponible prochainement.<br />
                Tu y trouveras les desks principaux, la culture, le process de recrutement et les attentes.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {bank.data?.desks && (
                <div>
                  <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-3">Desks principaux</div>
                  <div className="flex flex-wrap gap-2">
                    {bank.data.desks.map(d => (
                      <span key={d} className="bg-[rgba(124,58,237,0.15)] border border-[rgba(168,85,247,0.2)] text-purple-soft text-xs px-3 py-1 rounded-full">{d}</span>
                    ))}
                  </div>
                </div>
              )}
              {bank.data?.culture && (
                <div>
                  <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-3">Culture & profil recherché</div>
                  <p className="text-sm text-dr-grey leading-relaxed">{bank.data.culture}</p>
                </div>
              )}
              {bank.data?.process && bank.data.process.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-3">Process de recrutement</div>
                  <ul className="flex flex-col gap-2">
                    {bank.data.process.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dr-grey">
                        <span className="text-purple-glow flex-shrink-0 mt-0.5">→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {bank.data?.attentes && bank.data.attentes.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-3">Ce qu&apos;ils attendent vraiment</div>
                  <ul className="flex flex-col gap-2">
                    {bank.data.attentes.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dr-grey">
                        <span className="text-purple-glow flex-shrink-0 mt-0.5">→</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
