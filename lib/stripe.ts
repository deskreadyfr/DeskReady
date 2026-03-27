export const STRIPE_LINKS: Record<string, string> = {
  basic: 'https://buy.stripe.com/5kQbIUecS1Oc81hdx37Re00',
  gold: 'https://buy.stripe.com/8x25kw7Ou1OcdlB1Ol7Re01',
  review_cv: 'https://buy.stripe.com/bJe9AM7Ou1OcdlB2Sp7Re03',
  entretien_blanc: 'https://buy.stripe.com/00w28k6Kq50obdt78F7Re04',
  session_coaching: 'https://buy.stripe.com/dRm28k8Sy2Sg4P550x7Re06',
  pack_cv_entretien: 'https://buy.stripe.com/28E14gb0GfF2chx3Wt7Re07',
  pack_entretien_coaching: 'https://buy.stripe.com/fZu3cofgWeAY1CT3Wt7Re05',
}

export function payStripe(productKey: string) {
  const link = STRIPE_LINKS[productKey]
  if (!link) {
    alert('Lien de paiement non configuré. Merci de contacter contact@deskready.com')
    return
  }
  window.open(link, '_blank')
}
