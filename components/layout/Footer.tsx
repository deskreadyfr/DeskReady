import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(168,85,247,0.15)] py-16 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-syne font-extrabold text-xl text-dr-white mb-3">DeskReady</div>
            <p className="text-dr-grey text-sm leading-relaxed">From School to the Desk — la formation qui prépare vraiment aux desks.</p>
          </div>
          <div>
            <div className="text-dr-white text-sm font-semibold mb-4">Formation</div>
            <ul className="space-y-2.5">
              <li><Link href="/#offres" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Nos offres</Link></li>
              <li><Link href="/#temoignages" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Témoignages</Link></li>
              <li><Link href="/#faq" className="text-dr-grey hover:text-dr-white text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-dr-white text-sm font-semibold mb-4">Ressources</div>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="/career-tracker" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Career Tracker</Link></li>
              <li><Link href="/pricer" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Pricer</Link></li>
              <li><Link href="/banques" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Banques</Link></li>
              <li><Link href="/data-room" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Data Room</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-dr-white text-sm font-semibold mb-4">Légal</div>
            <ul className="space-y-2.5">
              <li><Link href="/mentions-legales" className="text-dr-grey hover:text-dr-white text-sm transition-colors">Mentions légales</Link></li>
              <li><a href="mailto:contact@deskready.com" className="text-dr-grey hover:text-dr-white text-sm transition-colors">contact@deskready.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[rgba(168,85,247,0.1)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dr-grey text-xs">© {new Date().getFullYear()} DeskReady. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/company/deskready" target="_blank" rel="noopener" className="text-dr-grey hover:text-dr-white text-xs transition-colors">LinkedIn</a>
            <a href="https://instagram.com/deskready" target="_blank" rel="noopener" className="text-dr-grey hover:text-dr-white text-xs transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
