'use client'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  cartCount?: number
  onCartClick?: () => void
  onAuthClick?: () => void
}

export default function Navbar({ cartCount = 0, onCartClick, onAuthClick }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const resources = [
    { href: '/blog', icon: '📝', label: 'Blog' },
    { href: '/career-tracker', icon: '📊', label: 'Career Tracker' },
    { href: '/pricer', icon: '📐', label: 'Pricer' },
    { href: '/banques', icon: '🏦', label: 'Banques' },
    { href: '/data-room', icon: '🗄️', label: 'Data Room' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-3 backdrop-blur-xl bg-[rgba(5,5,8,0.6)] border-b border-[rgba(168,85,247,0.15)]">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img
          src="/logo.png"
          alt="DeskReady"
          className="h-9 w-auto object-contain"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <span className="font-syne font-extrabold text-lg text-dr-white hidden">DeskReady</span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-10 list-none flex-1 justify-center">
        <li><Link href="/#offres" className="text-dr-white/80 hover:text-dr-white text-sm transition-colors">Formations</Link></li>
        <li><Link href="/#temoignages" className="text-dr-white/80 hover:text-dr-white text-sm transition-colors">Témoignages</Link></li>
        <li className="relative group">
          <button className="flex items-center gap-1 text-dr-white/80 hover:text-dr-white text-sm transition-colors bg-none border-none cursor-pointer font-sans">
            Ressources
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 group-hover:rotate-180">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Hover bridge */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+40px)] h-4" />
          <div className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-52 bg-[#0d0d14] border border-[rgba(168,85,247,0.15)] rounded-xl p-2 shadow-2xl opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200">
            {resources.map(r => (
              <Link key={r.href} href={r.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-dr-white/75 hover:text-dr-white hover:bg-[rgba(124,58,237,0.18)] text-sm transition-all">
                <span className="w-6 h-6 bg-[rgba(124,58,237,0.2)] rounded-md flex items-center justify-center text-xs flex-shrink-0">{r.icon}</span>
                {r.label}
              </Link>
            ))}
          </div>
        </li>
        <li><Link href="/#faq" className="text-dr-white/80 hover:text-dr-white text-sm transition-colors">FAQ</Link></li>
        <li><Link href="/#contact" className="text-dr-white/80 hover:text-dr-white text-sm transition-colors">Contact</Link></li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAuthClick}
          className="bg-purple-core text-dr-white text-sm px-4 py-2 rounded-md font-medium hover:bg-purple-glow transition-colors font-sans border-none cursor-pointer hidden md:block"
        >
          S&apos;inscrire / Se connecter
        </button>
        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative w-9 h-9 bg-[rgba(124,58,237,0.15)] border border-[rgba(168,85,247,0.15)] rounded-lg flex items-center justify-center hover:border-purple-glow transition-colors cursor-pointer"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-purple-glow text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer border-none bg-transparent"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block w-5 h-0.5 bg-dr-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-dr-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-dr-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0d0d14] border-b border-[rgba(168,85,247,0.15)] px-6 py-4 flex flex-col gap-3 md:hidden">
          <Link href="/#offres" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">Formations</Link>
          <Link href="/#temoignages" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">Témoignages</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">Blog</Link>
          <Link href="/career-tracker" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">Career Tracker</Link>
          <Link href="/pricer" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">Pricer</Link>
          <Link href="/banques" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">Banques</Link>
          <Link href="/data-room" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">Data Room</Link>
          <Link href="/#faq" onClick={() => setMobileOpen(false)} className="text-dr-white/80 text-sm py-2">FAQ</Link>
          <button
            onClick={onAuthClick}
            className="bg-purple-core text-dr-white text-sm px-4 py-2 rounded-md font-medium mt-2 w-full font-sans border-none cursor-pointer"
          >
            S&apos;inscrire / Se connecter
          </button>
        </div>
      )}
    </nav>
  )
}
