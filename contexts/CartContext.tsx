'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { LIMITED_QTY_ITEMS } from '@/lib/constants'

export interface CartItem { name: string; price: number; qty: number }

interface CartCtx {
  cart: CartItem[]
  add: (name: string, price: number) => void
  changeQty: (name: string, delta: number) => void
  remove: (name: string) => void
  clear: () => void
  total: number
  count: number
  isLimited: (name: string) => boolean
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const isLimited = (name: string) => LIMITED_QTY_ITEMS.includes(name)

  const add = (name: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing) {
        if (isLimited(name)) return prev
        return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { name, price, qty: 1 }]
    })
  }

  const changeQty = (name: string, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.name === name)
      if (!item) return prev
      const newQty = item.qty + delta
      if (newQty <= 0) return prev.filter(i => i.name !== name)
      if (delta > 0 && isLimited(name)) return prev
      return prev.map(i => i.name === name ? { ...i, qty: newQty } : i)
    })
  }

  const remove = (name: string) => setCart(p => p.filter(i => i.name !== name))
  const clear = () => setCart([])
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0)
  const count = cart.reduce((a, i) => a + i.qty, 0)

  return (
    <Ctx.Provider value={{ cart, add, changeQty, remove, clear, total, count, isLimited }}>
      {children}
    </Ctx.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
