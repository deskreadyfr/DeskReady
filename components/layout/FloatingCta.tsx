'use client'
import Link from 'next/link'

export default function FloatingCta() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        href="/#contact"
        className="flex items-center gap-2 bg-purple-core hover:bg-purple-glow text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg shadow-purple-core/30 transition-all duration-200"
      >
        <span>📅</span>
        Réserve un call gratuit
      </Link>
    </div>
  )
}
