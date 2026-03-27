'use client'
import type { Greeks } from '@/lib/pricer-math'

interface Props {
  result: Greeks | null
  model: string
  isCall: boolean
  S: number
  K: number
  T: number
  sigma: number
  r: number
}

const MODEL_NOTES: Record<string, string> = {
  bs: '<strong>Black-Scholes (1973)</strong> — Modèle analytique pour options européennes. Hypothèses : volatilité constante, taux sans risque constant, sous-jacent log-normal, sans dividendes.<br><br><em>d₁ = [ln(S/K) + (r + σ²/2)·T] / (σ·√T) &nbsp;|&nbsp; d₂ = d₁ − σ·√T</em><br><em>Call = S·N(d₁) − K·e⁻ʳᵀ·N(d₂) &nbsp;|&nbsp; Put = K·e⁻ʳᵀ·N(−d₂) − S·N(−d₁)</em>',
  binomial: '<strong>Binomial CRR (Cox-Ross-Rubinstein, 1979)</strong> — Arbre recombinant à N pas. Convergent vers BS quand N → ∞. Permet le pricing d\'options américaines (early exercise). Grecs par différences finies centrées.<br><br><em>u = e^(σ√(T/N)) &nbsp;|&nbsp; d = 1/u &nbsp;|&nbsp; p = (e^(r·Δt) − d) / (u − d)</em>',
  mc: '<strong>Monte Carlo</strong> — Simulation de N chemins browniens géométriques. Précision ∝ 1/√N. Idéal pour options path-dependent (barrière, asiatiques). Grecs calculés par bump-and-reprice analytique (BS).<br><br><em>S(T) = S · exp[(r − σ²/2)·T + σ·√T · Z] , Z ~ N(0,1)</em><br><em>Prix = e⁻ʳᵀ · E[max(S_T − K, 0)]</em>',
}

const MODEL_LABELS: Record<string, string> = {
  bs: 'Black-Scholes',
  binomial: 'Binomial CRR',
  mc: 'Monte Carlo',
}

export default function ResultsPanel({ result, model, isCall, S, K, T, sigma, r }: Props) {
  const moneyness = isCall ? (S >= K ? 'ITM' : 'OTM') : (S <= K ? 'ITM' : 'OTM')

  return (
    <div className="flex flex-col gap-4">
      {/* Price */}
      <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider">Prix théorique</div>
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{
              background: isCall ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              color: isCall ? '#22c55e' : '#ef4444',
            }}
          >
            {isCall ? 'Call' : 'Put'} · {moneyness}
          </span>
        </div>
        <div
          className="font-syne font-extrabold text-4xl mt-1"
          style={{ color: result ? '#f8f4ff' : '#a09ab5' }}
        >
          {result ? result.price.toFixed(4) + ' €' : '—'}
        </div>
        {result && (
          <div className="text-xs text-dr-grey mt-2">
            {MODEL_LABELS[model]} · S={S}€ K={K}€ T={T}j σ={(sigma * 100).toFixed(1)}% r={(r * 100).toFixed(1)}%
          </div>
        )}
      </div>

      {/* Greeks */}
      <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-5">
        <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-4">Grecs</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Delta (Δ)', value: result?.delta, dec: 4 },
            { label: 'Gamma (Γ)', value: result?.gamma, dec: 6 },
            { label: 'Vega (ν)', value: result?.vega, dec: 4 },
            { label: 'Theta (θ)', value: result?.theta, dec: 4 },
            { label: 'Rho (ρ)', value: result?.rho, dec: 4 },
          ].map(g => (
            <div key={g.label} className="bg-[rgba(255,255,255,0.02)] rounded-xl p-3">
              <div className="text-xs text-dr-grey mb-1">{g.label}</div>
              <div
                className="font-syne font-bold text-sm"
                style={{ color: g.value != null ? '#f8f4ff' : '#a09ab5' }}
              >
                {g.value != null ? g.value.toFixed(g.dec) : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formula note */}
      <div className="bg-[rgba(124,58,237,0.06)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-5 text-xs text-dr-grey leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: MODEL_NOTES[model] || '' }} />
      </div>
    </div>
  )
}
