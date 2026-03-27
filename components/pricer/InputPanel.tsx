'use client'

interface InputValues {
  S: number
  K: number
  T: number
  r: number
  sigma: number
  N: number
  nSims: number
  type: 'call' | 'put'
}

interface Props {
  values: InputValues
  model: string
  onChange: (vals: InputValues) => void
  onCalculate: () => void
  loading: boolean
  error: string
}

export default function InputPanel({ values, model, onChange, onCalculate, loading, error }: Props) {
  function set(k: keyof InputValues, v: string | number) {
    onChange({ ...values, [k]: v })
  }

  return (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-6">
      <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-5">Paramètres</div>

      {/* Call / Put toggle */}
      <div className="flex gap-1 mb-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.1)] rounded-xl p-1">
        {(['call', 'put'] as const).map(t => (
          <button
            key={t}
            onClick={() => set('type', t)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border-none capitalize"
            style={{
              background: values.type === t
                ? t === 'call' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'
                : 'transparent',
              color: values.type === t
                ? t === 'call' ? '#22c55e' : '#ef4444'
                : '#a09ab5',
            }}
          >
            {t === 'call' ? 'Call' : 'Put'}
          </button>
        ))}
      </div>

      {/* Main params */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { key: 'S' as keyof InputValues, label: 'Spot (S)', placeholder: '100', unit: '€' },
          { key: 'K' as keyof InputValues, label: 'Strike (K)', placeholder: '100', unit: '€' },
          { key: 'T' as keyof InputValues, label: 'Maturité (T)', placeholder: '252', unit: 'jours' },
          { key: 'r' as keyof InputValues, label: 'Taux sans risque (r)', placeholder: '5', unit: '%' },
          { key: 'sigma' as keyof InputValues, label: 'Volatilité (σ)', placeholder: '20', unit: '%' },
        ].map(inp => (
          <div key={inp.key}>
            <label style={{ fontSize: '0.78rem' }}>{inp.label}</label>
            <div className="relative">
              <input
                type="number"
                value={values[inp.key] as number}
                onChange={e => set(inp.key, parseFloat(e.target.value) || 0)}
                placeholder={inp.placeholder}
                style={{ paddingRight: '2.5rem' }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dr-grey pointer-events-none">
                {inp.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Binomial extra */}
      {model === 'binomial' && (
        <div className="mb-4">
          <label style={{ fontSize: '0.78rem' }}>Nombre de pas (N)</label>
          <input
            type="number"
            value={values.N}
            onChange={e => set('N', parseInt(e.target.value) || 200)}
            placeholder="200"
          />
        </div>
      )}

      {/* MC extra */}
      {model === 'mc' && (
        <div className="mb-4">
          <label style={{ fontSize: '0.78rem' }}>Simulations</label>
          <input
            type="number"
            value={values.nSims}
            onChange={e => set('nSims', parseInt(e.target.value) || 50000)}
            placeholder="50000"
          />
        </div>
      )}

      {error && (
        <div className="text-xs text-down bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      <button
        onClick={onCalculate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-purple-core text-white text-sm font-semibold hover:bg-purple-glow transition-colors cursor-pointer border-none disabled:opacity-60"
      >
        {loading ? '⏳ Calcul en cours...' : 'Calculer →'}
      </button>
    </div>
  )
}
