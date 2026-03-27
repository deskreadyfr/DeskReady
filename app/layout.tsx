import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'DeskReady — From School to the Desk', template: '%s | DeskReady' },
  description: 'La formation qui prépare vraiment aux desks de trading et finance de marché.',
  keywords: ['formation', 'trading', 'finance de marché', 'desk', 'stage', 'CDI'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
