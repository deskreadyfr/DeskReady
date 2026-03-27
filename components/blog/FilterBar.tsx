'use client'
import { BLOG_CATEGORIES } from '@/lib/constants'

interface Props {
  active: string
  onChange: (key: string) => void
}

export default function FilterBar({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-10">
      {BLOG_CATEGORIES.map(c => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer font-sans"
          style={{
            background: active === c.key ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
            borderColor: active === c.key ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.15)',
            color: active === c.key ? '#f8f4ff' : '#a09ab5',
          }}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
