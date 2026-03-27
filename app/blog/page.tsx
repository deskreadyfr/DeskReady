'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FilterBar from '@/components/blog/FilterBar'
import ArticleCard from '@/components/blog/ArticleCard'
import { ARTICLES } from '@/data/articles'

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all' ? ARTICLES : ARTICLES.filter(a => a.tag === activeFilter)
  const featured = filtered.find(a => a.featured)
  const rest = filtered.filter(a => !a.featured)

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <div className="max-w-[1100px] mx-auto px-8 py-16 relative z-10">
          {/* Page hero */}
          <div className="mb-12">
            <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-3">Ressources</div>
            <h1
              className="font-raleway font-black text-dr-white leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-0.03em' }}
            >
              Blog
            </h1>
            <p className="text-dr-grey font-light max-w-lg" style={{ fontSize: '1.05rem' }}>
              Technique, networking, marchés — les ressources qui font la différence.
            </p>
          </div>

          {/* Filters */}
          <FilterBar active={activeFilter} onChange={setActiveFilter} />

          {/* Coming soon banner */}
          <div className="flex items-center gap-3 bg-[rgba(124,58,237,0.08)] border border-[rgba(168,85,247,0.2)] rounded-xl px-5 py-4 mb-10">
            <div className="w-2 h-2 rounded-full bg-purple-glow animate-blink flex-shrink-0" />
            <p className="text-sm text-dr-grey">
              <strong className="text-dr-white">Les premiers articles arrivent bientôt.</strong> En attendant, découvre nos ressources interactives (Pricer, Career Tracker, Data Room).
            </p>
          </div>

          {/* Articles */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-5 opacity-50">📭</div>
              <div className="font-syne font-bold text-dr-grey text-xl mb-2">Aucun article pour l&apos;instant</div>
              <div className="text-dr-grey text-sm opacity-70">Les premiers articles arrivent bientôt.</div>
            </div>
          ) : (
            <>
              {featured && <ArticleCard article={featured} featured />}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {rest.map(a => <ArticleCard key={a.id} article={a} />)}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
