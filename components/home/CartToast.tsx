'use client'
import { useEffect, useState } from 'react'

interface ToastProps {
  name: string
  price: number
  visible: boolean
  onHide: () => void
}

export default function CartToast({ name, price, visible, onHide }: ToastProps) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (visible) {
      setLeaving(false)
      const timer = setTimeout(() => {
        setLeaving(true)
        setTimeout(onHide, 300)
      }, 2800)
      return () => clearTimeout(timer)
    }
  }, [visible, onHide])

  if (!visible && !leaving) return null

  return (
    <div
      className={`fixed bottom-6 left-6 z-[300] flex items-center gap-3 bg-[#0d0d14] border border-[rgba(168,85,247,0.3)] rounded-2xl px-4 py-3 shadow-2xl ${leaving ? 'animate-toast-out' : 'animate-toast-in'}`}
    >
      <div className="text-2xl">🛒</div>
      <div>
        <div className="text-xs font-semibold text-up">✓ Ajouté au panier</div>
        <div className="text-sm font-semibold text-dr-white">{name}</div>
        <div className="text-xs font-bold text-purple-glow">{price}€</div>
      </div>
    </div>
  )
}
