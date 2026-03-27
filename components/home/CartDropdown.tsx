'use client'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

interface Props {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartDropdown({ open, onClose, onCheckout }: Props) {
  const { cart, changeQty, remove, total, isLimited } = useCart()

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[150]" onClick={onClose} />
      {/* Dropdown */}
      <div className="fixed top-[70px] right-8 z-[200] w-[360px] bg-[#0d0d14] border border-[rgba(168,85,247,0.15)] rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="font-syne font-bold text-base text-dr-white">Mon panier</span>
          <button
            onClick={onClose}
            className="text-dr-grey hover:text-dr-white text-lg leading-none bg-transparent border-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto mb-4">
          {cart.length === 0 ? (
            <div className="text-center text-dr-grey text-sm py-8">Votre panier est vide</div>
          ) : (
            cart.map(item => {
              const lim = isLimited(item.name)
              return (
                <div
                  key={item.name}
                  className="flex justify-between items-center bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-xl px-4 py-3 gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-dr-white truncate">{item.name}</div>
                    <div className="text-xs text-dr-grey mt-0.5">{item.price}€ / unité</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="inline-flex items-center border border-[rgba(168,85,247,0.25)] rounded-lg overflow-hidden bg-[rgba(124,58,237,0.08)]">
                      <button
                        onClick={() => changeQty(item.name, -1)}
                        className="bg-none border-none text-dr-grey cursor-pointer text-lg w-7 h-7 flex items-center justify-center hover:text-dr-white hover:bg-[rgba(124,58,237,0.2)] transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold min-w-[22px] text-center px-0.5 text-dr-white">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.name, 1)}
                        disabled={lim}
                        className="bg-none border-none cursor-pointer text-lg w-7 h-7 flex items-center justify-center transition-colors"
                        style={{ color: lim ? 'rgba(160,154,181,0.3)' : '#a09ab5', cursor: lim ? 'not-allowed' : 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-purple-glow font-bold min-w-[36px] text-right text-sm">{item.price * item.qty}€</span>
                    <button
                      onClick={() => remove(item.name)}
                      className="text-dr-grey hover:text-dr-white text-sm cursor-pointer bg-transparent border-none px-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[rgba(168,85,247,0.15)] pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-dr-grey">Total</span>
              <span className="text-purple-glow font-bold text-base">{total}€</span>
            </div>
            <Link
              href="/#panier"
              onClick={() => { onClose(); onCheckout() }}
              className="block w-full text-center bg-purple-core text-dr-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-glow transition-colors"
            >
              Procéder au paiement →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
