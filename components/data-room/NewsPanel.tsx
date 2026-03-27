'use client'
import { useState } from 'react'
import { NEWS_ITEMS } from '@/data/market'

const TABS = [
  { key: 'all', label: 'Tout' },
  { key: 'macro', label: 'Macro' },
  { key: 'rates', label: 'Rates' },
  { key: 'fx', label: 'FX' },
  { key: 'equity', label: 'Equity' },
]

const IMPACT_COLORS: Record<string, string> = {
  high: '#ef4444',
  mid: '#f59e0b',
  low: '#22c55e',
}

export default function NewsPanel() {
  const [tab, setTab] = useState('all')

  const filtered = tab === 'all' ? NEWS_ITEMS : NEWS_ITEMS.filter(n => n.cat === tab)

  return (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[rgba(168,85,247,0.1)]">
        <div className="font-syne font-bold text-dr-white text-sm mb-3">News & Flux</div>
        <div className="flex gap-1 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer border-none transition-all"
              style={{
                background: tab === t.key ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
                color: tab === t.key ? '#f8f4ff' : '#a09ab5',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-[rgba(168,85,247,0.06)] max-h-[500px] overflow-y-auto">
        {filtered.map((n, i) => (
          <a
            key={i}
            href={n.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-5 py-4 hover:bg-[rgba(124,58,237,0.05)] transition-colors no-underline"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-dr-grey">{n.time}</span>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: IMPACT_COLORS[n.impact] }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: IMPACT_COLORS[n.impact] }}
              >
                {n.impact}
              </span>
              <span className="text-xs text-dr-grey uppercase ml-1">{n.cat}</span>
            </div>
            <div className="text-sm font-semibold text-dr-white leading-snug mb-1">{n.title}</div>
            <div className="text-xs text-dr-grey leading-relaxed font-light">{n.excerpt}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
