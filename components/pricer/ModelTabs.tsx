'use client'

interface Props {
  model: string
  onChange: (model: string) => void
}

const MODELS = [
  { key: 'bs', label: 'Black-Scholes' },
  { key: 'binomial', label: 'Binomial CRR' },
  { key: 'mc', label: 'Monte Carlo' },
]

export default function ModelTabs({ model, onChange }: Props) {
  return (
    <div className="flex gap-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-xl p-1 mb-6">
      {MODELS.map(m => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer border-none"
          style={{
            background: model === m.key ? 'rgba(124,58,237,0.3)' : 'transparent',
            color: model === m.key ? '#f8f4ff' : '#a09ab5',
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
