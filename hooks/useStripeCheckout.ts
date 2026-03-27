'use client'

import { useState } from 'react'

interface CartItem {
  name: string
  price: number
  qty: number
}

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false)

  const createCheckoutSession = async (items: CartItem[]) => {
    if (!items || items.length === 0) {
      alert('Votre panier est vide')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        'https://lysibziqgissumqszedk.supabase.co/functions/v1/create-checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items })
        }
      )

      const data = await response.json()

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        alert('Erreur: ' + (data.error || 'Impossible de créer la session'))
      }
    } catch (error) {
      console.error('Erreur checkout:', error)
      alert('Erreur lors de la création de la session de paiement')
    } finally {
      setLoading(false)
    }
  }

  return { createCheckoutSession, loading }
}
