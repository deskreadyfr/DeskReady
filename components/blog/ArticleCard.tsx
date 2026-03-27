import type { Article } from '@/types/blog'
import { CATEGORIES } from '@/data/articles'

interface Props {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured }: Props) {
  const categoryLabel = CATEGORIES[article.tag] || article.tag

  if (featured) {
    return (
      <a
        href={article.url || '#'}
        className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[rgba(168,85,247,0.25)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all no-underline text-dr-white mb-8"
      >
        <div
          className="min-h-[200px] md:min-h-[280px] flex items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #3b0764 0%, #1a0535 50%, #7c3aed 100%)' }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.3) 0%, transparent 60%)' }}
          />
          <span className="text-6xl relative z-10">{article.icon}</span>
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-purple-soft text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[rgba(168,85,247,0.15)] border border-[rgba(168,85,247,0.3)] mb-4">
              <span className="bg-[rgba(168,85,247,0.25)] text-purple-glow px-1.5 py-0.5 rounded text-xs">★ À la une</span>
              {categoryLabel}
            </div>
            <h3 className="font-syne font-bold text-xl leading-snug mb-4">{article.title}</h3>
            <p className="text-dr-grey text-sm leading-relaxed font-light mb-5">{article.excerpt}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-dr-grey">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #3b0764, #7c3aed)' }}
              >
                {article.authorInitials}
              </div>
              <span>{article.author}</span>
            </div>
            <span className="opacity-30">·</span>
            <span>{article.date}</span>
            <span className="opacity-30">·</span>
            <span>{article.readTime} de lecture</span>
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      href={article.url || '#'}
      className="flex flex-col bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-xl overflow-hidden hover:border-[rgba(168,85,247,0.4)] hover:bg-[rgba(124,58,237,0.06)] hover:-translate-y-1 transition-all no-underline text-dr-white"
    >
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3b0764, #0d0120)' }}
      >
        <span className="text-4xl relative z-10">{article.icon}</span>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(5,5,8,0.6))' }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block bg-[rgba(124,58,237,0.2)] border border-[rgba(168,85,247,0.25)] text-purple-soft text-xs font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-3">
          {categoryLabel}
        </span>
        <h3 className="font-syne font-bold text-base leading-snug mb-2">{article.title}</h3>
        <p className="text-dr-grey text-xs leading-relaxed font-light flex-1 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-dr-grey border-t border-[rgba(168,85,247,0.1)] pt-3">
          <span>⏱ {article.readTime}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </a>
  )
}
