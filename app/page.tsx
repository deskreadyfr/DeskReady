'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCta from '@/components/layout/FloatingCta'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Offres from '@/components/home/Offres'
import Temoignages from '@/components/home/Temoignages'
import Faq from '@/components/home/Faq'
import CartDropdown from '@/components/home/CartDropdown'
import CartToast from '@/components/home/CartToast'
import { CartProvider, useCart } from '@/contexts/CartContext'
import Modal from '@/components/ui/Modal'
import { payStripe } from '@/lib/stripe'
import { useStripeCheckout } from '@/hooks/useStripeCheckout'

function PageContent() {
  const { cart, count, total, changeQty, remove } = useCart()
  const { createCheckoutSession, loading: checkoutLoading } = useStripeCheckout()
  const [cartOpen, setCartOpen] = useState(false)
  const [cartPage, setCartPage] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [candidatureOpen, setCandidatureOpen] = useState(false)
  const [toast, setToast] = useState({ visible: false, name: '', price: 0 })

  // Contact form state
  const [msgNom, setMsgNom] = useState('')
  const [msgPrenom, setMsgPrenom] = useState('')
  const [msgEmail, setMsgEmail] = useState('')
  const [msgQuestion, setMsgQuestion] = useState('')
  const [msgFeedback, setMsgFeedback] = useState('')
  const [msgError, setMsgError] = useState('')

  // Prebooking state
  const [bkPrenom, setBkPrenom] = useState('')
  const [bkNom, setBkNom] = useState('')
  const [bkEmail, setBkEmail] = useState('')
  const [bkEcole, setBkEcole] = useState('')
  const [bkInteret, setBkInteret] = useState('')
  const [bkDesk, setBkDesk] = useState('')
  const [bkObjectif, setBkObjectif] = useState('')
  const [showCalendly, setShowCalendly] = useState(false)
  const [bkError, setBkError] = useState('')

  function showCartToast(name: string, price: number) {
    setToast({ visible: true, name, price })
  }

  function sendMessage() {
    if (!msgNom || !msgPrenom || !msgEmail || !msgQuestion) {
      setMsgError('Tous les champs obligatoires doivent être remplis.')
      return
    }
    setMsgError('')
    setMsgFeedback('✓ Message envoyé ! On te répond sous 24h.')
  }

  function validatePrebooking() {
    if (!bkPrenom || !bkNom || !bkEmail || !bkEcole || !bkInteret) {
      setBkError('Merci de remplir tous les champs obligatoires.')
      return
    }
    setBkError('')
    setShowCalendly(true)
  }

  const mainPayMap: Record<string, string> = {
    'basic': 'Basic — Accès à vie',
    'gold': 'Gold — Accès à vie',
  }

  const checkoutItems = cart.map(item => {
    // Find stripe key for this item
    const keyMap: Record<string, string> = {
      'Basic — Accès à vie': 'basic',
      'Gold — Accès à vie': 'gold',
      'Review de CV': 'review_cv',
      'Entretien blanc': 'entretien_blanc',
      'Session de coaching': 'session_coaching',
      'Pack CV + Entretien': 'pack_cv_entretien',
      'Pack Entretien + Coaching': 'pack_entretien_coaching',
    }
    return { ...item, stripeKey: keyMap[item.name] }
  })

  return (
    <div className="min-h-screen">
      <Navbar
        cartCount={count}
        onCartClick={() => setCartOpen(!cartOpen)}
        onAuthClick={() => setAuthOpen(true)}
      />

      <CartDropdown
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setCartPage(true) }}
      />

      <CartToast
        name={toast.name}
        price={toast.price}
        visible={toast.visible}
        onHide={() => setToast(t => ({ ...t, visible: false }))}
      />

      {/* Main sections */}
      <Hero />
      <About />
      <Offres onCandidature={() => setCandidatureOpen(true)} />
      <Temoignages />

      {/* Resources section */}
      <section id="blog" className="py-12 px-8 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Ressources</div>
              <h2 className="font-syne font-bold text-dr-white text-3xl leading-tight">Tout ce qu&apos;il te faut<br />pour réussir</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/blog', icon: '📝', name: 'Blog', desc: 'Articles techniques, networking et marchés — les ressources qui font la différence en entretien.' },
              { href: '/career-tracker', icon: '📊', name: 'Career Tracker', desc: 'Suis tes candidatures en temps réel : statut, rappels, contacts — ne laisse rien passer.' },
              { href: '/pricer', icon: '📐', name: 'Pricer', desc: 'Calculez le prix et les Grecs de vos options (calls & puts) : Black-Scholes, Binomial et Monte Carlo.' },
              { href: '/banques', icon: '🏦', name: 'Fiches Banques', desc: 'Desks, culture, process — tout ce qu\'il faut savoir avant de postuler dans chaque établissement.' },
              { href: '/data-room', icon: '🗄️', name: 'Data Room', desc: 'Marchés en temps réel, actualités macro et calendrier économique — gardez un œil sur les marchés.' },
            ].map(r => (
              <Link
                key={r.href}
                href={r.href}
                className="flex items-start gap-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-xl p-5 hover:border-[rgba(168,85,247,0.4)] hover:bg-[rgba(124,58,237,0.06)] hover:-translate-y-0.5 transition-all no-underline"
              >
                <div className="w-10 h-10 bg-[rgba(124,58,237,0.15)] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {r.icon}
                </div>
                <div>
                  <div className="font-syne font-bold text-dr-white text-sm mb-1">{r.name}</div>
                  <div className="text-xs text-dr-grey leading-relaxed font-light">{r.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      {/* Contact section */}
      <section id="contact" className="py-12 px-8 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-3">Nous contacter</div>
            <h2 className="font-syne font-bold text-dr-white text-3xl md:text-4xl leading-tight mb-4">On est là pour toi</h2>
            <p className="text-dr-grey font-light max-w-lg mx-auto">Une question ou prêt à passer à l&apos;action ? Les deux options sont juste en dessous.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Message form */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-7 flex flex-col">
              <div className="mb-5">
                <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Une question ?</div>
                <h3 className="font-syne font-bold text-dr-white text-xl mb-1">On te répond <span className="text-purple-glow">rapidement</span></h3>
                <p className="text-dr-grey text-xs leading-relaxed">Tu as une question sur l&apos;accompagnement DeskReady ? Écris-nous directement.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><label>Nom *</label><input value={msgNom} onChange={e => setMsgNom(e.target.value)} placeholder="Dupont" /></div>
                <div><label>Prénom *</label><input value={msgPrenom} onChange={e => setMsgPrenom(e.target.value)} placeholder="Jean" /></div>
              </div>
              <div className="mb-3"><label>E-mail *</label><input type="email" value={msgEmail} onChange={e => setMsgEmail(e.target.value)} placeholder="jean@skema.edu" /></div>
              <div className="mb-4 flex-1 flex flex-col">
                <label>Ta question *</label>
                <textarea rows={4} value={msgQuestion} onChange={e => setMsgQuestion(e.target.value)} placeholder="Ex: Quelle est la différence entre Basic et Gold ?..." style={{ flex: 1, resize: 'vertical' }} />
              </div>
              {msgError && <div className="text-xs text-down bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2 mb-3">{msgError}</div>}
              {msgFeedback && <div className="text-xs text-up mb-3">{msgFeedback}</div>}
              <button onClick={sendMessage} className="w-full py-3 rounded-xl bg-purple-core text-white text-sm font-medium hover:bg-purple-glow transition-colors cursor-pointer border-none">
                Envoyer →
              </button>
            </div>

            {/* Booking / Calendly */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-7 flex flex-col" id="booking">
              {!showCalendly ? (
                <>
                  <div className="mb-5">
                    <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Call découverte · Gratuit</div>
                    <h3 className="font-syne font-bold text-dr-white text-xl mb-1">Réserve ton call <span className="text-purple-glow">en 2 min</span></h3>
                    <p className="text-dr-grey text-xs leading-relaxed">Lors de cet échange, nous ferons le point sur ton parcours, ta stratégie de candidatures et les prochaines étapes.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div><label>Prénom *</label><input value={bkPrenom} onChange={e => setBkPrenom(e.target.value)} placeholder="Jean" /></div>
                    <div><label>Nom *</label><input value={bkNom} onChange={e => setBkNom(e.target.value)} placeholder="Dupont" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div><label>Email *</label><input type="email" value={bkEmail} onChange={e => setBkEmail(e.target.value)} placeholder="jean@skema.edu" /></div>
                    <div><label>École / Université *</label><input value={bkEcole} onChange={e => setBkEcole(e.target.value)} placeholder="SKEMA, HEC, Dauphine..." /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label>Ce qui t&apos;intéresse *</label>
                      <select value={bkInteret} onChange={e => setBkInteret(e.target.value)}>
                        <option value="">Sélectionne</option>
                        <option>Basic · 199€</option>
                        <option>Gold · 399€</option>
                        <option>Elite · 599€</option>
                        <option>Juste un call découverte</option>
                      </select>
                    </div>
                    <div><label>Desk / Métier visé</label><input value={bkDesk} onChange={e => setBkDesk(e.target.value)} placeholder="Sales FX, Rates, Credit..." /></div>
                  </div>
                  <div className="mb-4 flex flex-col flex-1">
                    <label>Ton objectif (optionnel)</label>
                    <textarea rows={3} value={bkObjectif} onChange={e => setBkObjectif(e.target.value)} placeholder="Ex: je cible un stage Sales FIC pour l'été 2026..." style={{ resize: 'vertical', flex: 1 }} />
                  </div>
                  {bkError && <div className="text-xs text-down bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2 mb-3">{bkError}</div>}
                  <button onClick={validatePrebooking} className="w-full py-3 rounded-xl bg-purple-core text-white text-sm font-medium hover:bg-purple-glow transition-colors cursor-pointer border-none">
                    Choisir mon créneau →
                  </button>
                </>
              ) : (
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-0.5">Call découverte · Gratuit</div>
                      <div className="text-xs text-dr-grey">{bkPrenom} {bkNom} · {bkEmail}</div>
                    </div>
                    <button
                      onClick={() => setShowCalendly(false)}
                      className="text-dr-grey hover:text-dr-white border border-[rgba(168,85,247,0.2)] rounded-lg px-3 py-1.5 text-xs cursor-pointer bg-transparent transition-colors"
                    >
                      ← Modifier
                    </button>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-[rgba(255,255,255,0.02)] border border-[rgba(168,85,247,0.1)] rounded-xl p-8">
                    <div className="text-center text-dr-grey text-sm">
                      <div className="text-3xl mb-3">📅</div>
                      <div className="font-semibold text-dr-white mb-2">Widget Calendly</div>
                      <div className="text-xs">Intégrez votre lien Calendly ici pour permettre aux visiteurs de réserver un créneau.</div>
                      <div className="mt-4">
                        <a
                          href="https://calendly.com/deskready"
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center bg-purple-core text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-glow transition-colors"
                        >
                          Ouvrir Calendly →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Panier page */}
      {cartPage && (
        <section id="panier" className="py-20 px-8 md:px-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Mon panier</div>
                <h2 className="font-syne font-bold text-dr-white text-3xl">Récapitulatif de ma commande</h2>
              </div>
              <button
                onClick={() => setCartPage(false)}
                className="text-dr-grey hover:text-dr-white border border-[rgba(168,85,247,0.2)] rounded-lg px-4 py-2 text-sm cursor-pointer bg-transparent"
              >
                ← Retour
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🛒</div>
                <div className="font-syne font-bold text-dr-white text-xl mb-2">Votre panier est vide</div>
                <div className="text-dr-grey text-sm mb-6">Découvrez nos offres et ajoutez des produits à votre panier.</div>
                <button
                  onClick={() => setCartPage(false)}
                  className="bg-purple-core text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-purple-glow cursor-pointer border-none"
                >
                  Voir les offres →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
                {/* Items */}
                <div className="flex flex-col gap-4">
                  {cart.map(item => {
                    const keyMap: Record<string, string> = {
                      'Basic — Accès à vie': 'basic',
                      'Gold — Accès à vie': 'gold',
                      'Review de CV': 'review_cv',
                      'Entretien blanc': 'entretien_blanc',
                      'Session de coaching': 'session_coaching',
                      'Pack CV + Entretien': 'pack_cv_entretien',
                      'Pack Entretien + Coaching': 'pack_entretien_coaching',
                    }
                    const stripeKey = keyMap[item.name]
                    return (
                      <div
                        key={item.name}
                        className="flex justify-between items-center bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-5"
                      >
                        <div>
                          <div className="font-syne font-bold text-dr-white mb-0.5">{item.name}</div>
                          <div className="text-xs text-dr-grey">{item.price}€ / unité</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="inline-flex items-center border border-[rgba(168,85,247,0.3)] rounded-xl overflow-hidden bg-[rgba(124,58,237,0.08)]">
                            <button onClick={() => changeQty(item.name, -1)} className="bg-none border-none text-dr-grey cursor-pointer text-lg w-9 h-9 flex items-center justify-center hover:text-dr-white hover:bg-[rgba(124,58,237,0.2)] transition-colors">−</button>
                            <span className="text-base font-bold min-w-[28px] text-center px-1 text-dr-white">{item.qty}</span>
                            <button onClick={() => changeQty(item.name, 1)} className="bg-none border-none text-dr-grey cursor-pointer text-lg w-9 h-9 flex items-center justify-center hover:text-dr-white hover:bg-[rgba(124,58,237,0.2)] transition-colors">+</button>
                          </div>
                          <span className="font-syne font-extrabold text-purple-glow text-lg">{item.price * item.qty}€</span>
                          {stripeKey && (
                            <button
                              onClick={() => payStripe(stripeKey)}
                              className="bg-purple-core text-white text-xs px-3 py-1.5 rounded-lg hover:bg-purple-glow cursor-pointer border-none"
                            >
                              Payer →
                            </button>
                          )}
                          <button onClick={() => remove(item.name)} className="text-dr-grey hover:text-down text-sm cursor-pointer bg-transparent border border-[rgba(168,85,247,0.2)] rounded-lg px-3 py-1.5 hover:border-down transition-colors">Retirer</button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Summary */}
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-6 sticky top-24">
                  <div className="font-syne font-bold text-dr-white text-base mb-5">Résumé</div>
                  <div className="flex flex-col gap-3 mb-4">
                    {cart.map(item => (
                      <div key={item.name} className="flex justify-between text-sm text-dr-grey">
                        <span>{item.name}</span>
                        <span>{item.price * item.qty}€</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[rgba(168,85,247,0.15)] pt-4 flex justify-between font-bold text-base mb-5">
                    <span className="text-dr-white">Total</span>
                    <span className="text-purple-glow">{total}€</span>
                  </div>
                  <button
                    onClick={() => createCheckoutSession(cart)}
                    disabled={checkoutLoading}
                    className="block w-full text-center bg-purple-core text-white py-3 rounded-xl text-sm font-medium hover:bg-purple-glow transition-colors cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading ? 'Redirection...' : 'Réserver & payer →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Auth Modal */}
      <Modal open={authOpen} onClose={() => setAuthOpen(false)}>
        <h3 className="font-syne font-bold text-dr-white text-xl mb-2">Espace membres</h3>
        <p className="text-dr-grey text-sm mb-6">La plateforme DeskReady est en cours de développement. En attendant, contacte-nous directement.</p>
        <a
          href="mailto:contact@deskready.com"
          className="block w-full text-center bg-purple-core text-white py-3 rounded-xl text-sm font-medium hover:bg-purple-glow transition-colors"
        >
          contact@deskready.com
        </a>
      </Modal>

      {/* Candidature modal */}
      <Modal open={candidatureOpen} onClose={() => setCandidatureOpen(false)} className="max-w-lg">
        <h3 className="font-syne font-bold text-dr-white text-xl mb-1">Candidature Elite</h3>
        <p className="text-dr-grey text-sm mb-6">Le pack Elite est réservé aux profils les plus ambitieux. Envoie ta candidature pour que nous puissions évaluer ton profil.</p>
        <div className="flex flex-col gap-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label>Prénom *</label><input placeholder="Jean" /></div>
            <div><label>Nom *</label><input placeholder="Dupont" /></div>
          </div>
          <div><label>Email *</label><input type="email" placeholder="jean@skema.edu" /></div>
          <div><label>École / Université *</label><input placeholder="SKEMA, HEC, Dauphine..." /></div>
          <div><label>Desk / Métier visé</label><input placeholder="Sales FX, Rates..." /></div>
          <div>
            <label>Motivation (optionnel)</label>
            <textarea rows={3} placeholder="Pourquoi le pack Elite vous correspond..." style={{ resize: 'vertical' }} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setCandidatureOpen(false)} className="flex-1 py-3 rounded-xl border border-[rgba(168,85,247,0.2)] text-dr-grey cursor-pointer bg-transparent hover:text-dr-white text-sm">Annuler</button>
          <button
            onClick={() => {
              setCandidatureOpen(false)
              alert('Candidature envoyée ! On te contacte sous 48h.')
            }}
            className="flex-1 py-3 rounded-xl bg-purple-core text-white text-sm font-medium hover:bg-purple-glow cursor-pointer border-none"
          >
            Envoyer ma candidature →
          </button>
        </div>
      </Modal>

      <FloatingCta />
      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  )
}
