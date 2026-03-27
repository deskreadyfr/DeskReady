import type { Asset, NewsItem, CalendarEvent, KeyLevel } from '@/types/market'

export const ASSETS: Asset[] = [
  // FX
  { cat: 'FX', name: 'EUR/USD', val: '1.1572', chg: -0.27, chgAbs: '-0.0031' },
  { cat: 'FX', name: 'GBP/USD', val: '1.3245', chg: -0.38, chgAbs: '-0.0051' },
  { cat: 'FX', name: 'USD/JPY', val: '155.70', chg: +0.58, chgAbs: '+0.90' },
  { cat: 'FX', name: 'EUR/GBP', val: '0.8737', chg: +0.12, chgAbs: '+0.0011' },
  // RATES
  { cat: 'RATES', name: 'UST 2Y',   val: '3.89%', chg: +2.5,  chgAbs: '+2.5 bp' },
  { cat: 'RATES', name: 'UST 10Y',  val: '4.39%', chg: +8.0,  chgAbs: '+8.0 bp' },
  { cat: 'RATES', name: 'Bund 10Y', val: '2.88%', chg: +4.5,  chgAbs: '+4.5 bp' },
  { cat: 'RATES', name: 'OAT 10Y',  val: '3.48%', chg: +5.2,  chgAbs: '+5.2 bp' },
  { cat: 'RATES', name: 'BTP 10Y',  val: '3.82%', chg: +6.8,  chgAbs: '+6.8 bp' },
  // CREDIT
  { cat: 'CREDIT', name: 'iTraxx Main',  val: '72 bp',  chg: +5.5,  chgAbs: '+5.5 bp' },
  { cat: 'CREDIT', name: 'iTraxx Xover', val: '312 bp', chg: +15.0, chgAbs: '+15.0 bp' },
  { cat: 'CREDIT', name: 'CDX IG',       val: '62 bp',  chg: +3.8,  chgAbs: '+3.8 bp' },
  // EQUITY
  { cat: 'EQUITY', name: 'Euro Stoxx 50', val: '5,412',  chg: -0.95, chgAbs: '-51.9 pts' },
  { cat: 'EQUITY', name: 'DAX',           val: '22 738', chg: -0.82, chgAbs: '-187.6 pts' },
  { cat: 'EQUITY', name: 'CAC 40',        val: '8 021',  chg: -0.71, chgAbs: '-57.5 pts' },
  { cat: 'EQUITY', name: 'FTSE 100',      val: '9 284',  chg: -0.53, chgAbs: '-49.6 pts' },
  { cat: 'EQUITY', name: 'S&P 500',       val: '6,557',  chg: -0.73, chgAbs: '-48.3 pts' },
  { cat: 'EQUITY', name: 'Nasdaq 100',    val: '22 481', chg: -0.91, chgAbs: '-206.2 pts' },
  { cat: 'EQUITY', name: 'Dow Jones',     val: '46 124', chg: -0.18, chgAbs: '-84.4 pts' },
  { cat: 'EQUITY', name: 'Nikkei 225',    val: '53 749', chg: +2.87, chgAbs: '+1499.8 pts' },
  { cat: 'EQUITY', name: 'VIX',           val: '24.9',   chg: +5.21, chgAbs: '+1.24' },
  // COMMODITIES
  { cat: 'COMMODITIES', name: 'Gold', val: '$4,547', chg: +0.82, chgAbs: '+$36.9' },
  { cat: 'COMMODITIES', name: 'WTI',  val: '$99.8',  chg: +1.85, chgAbs: '+$1.81' },
]

export const NEWS_ITEMS: NewsItem[] = [
  {
    cat: 'rates', time: '09:15', date: '2026-03-25', impact: 'high',
    title: 'Treasuries — le 10 ans à 4,39%, au plus haut depuis 8 mois',
    excerpt: 'Les rendements américains poursuivent leur hausse sous la pression inflationniste du pétrole. La prochaine baisse Fed est désormais repoussée à décembre 2026.',
    url: 'https://www.cnbc.com/2026/03/24/treasury-yields-oil-price-middle-east-risks.html'
  },
  {
    cat: 'fx', time: '10:30', date: '2026-03-25', impact: 'mid',
    title: 'EUR/USD à 1,1572 — dollar soutenu par les taux et la géopolitique',
    excerpt: 'Le DXY repasse au-dessus de 99,65. EUR/USD évolue entre le support 1,1510 et la résistance 1,1600.',
    url: 'https://www.fxempire.com/forecasts/article/u-s-dollar-rebounds-as-treasury-yields-jump-1586655'
  },
  {
    cat: 'equity', time: '16:30', date: '2026-03-24', impact: 'high',
    title: "S&P 500 à 6 557 — 4e semaine consécutive de baisse, risque stagflation",
    excerpt: "L'indice recule de 0,73% en séance, pénalisé par la reprise des prix pétroliers. Le marché price désormais un scénario stagflationniste.",
    url: 'https://markets.financialcontent.com/stocks/article/marketminute-2026-3-24-s-and-p-500-slumps-to-6557'
  },
  {
    cat: 'fx', time: '17:15', date: '2026-03-24', impact: 'mid',
    title: 'GBP/USD — sterling pénalisé par le pétrole et les taux US',
    excerpt: 'La livre sterling cède du terrain. La BoE maintient 3,75% mais avertit d\'une inflation difficile à maîtriser.',
    url: 'https://www.fxstreet.com/news/gbp-usd-slips-202603241617'
  },
  {
    cat: 'macro', time: '17:30', date: '2026-03-23', impact: 'high',
    title: "Trump — report des frappes sur l'Iran, net rebond de Wall Street",
    excerpt: "Suite au report des frappes américaines sur les infrastructures iraniennes, le Dow Jones gagne 631 points (+1,38%). S&P 500 +1,15%, Nasdaq +1,38%.",
    url: 'https://www.cnn.com/2026/03/23/business/stocks-dow-market'
  },
  {
    cat: 'macro', time: '15:30', date: '2026-03-20', impact: 'high',
    title: 'Pétrole > 100$ — S&P 500 perd quasi 1%, VIX dépasse 24',
    excerpt: 'Le Brent franchit 100$ pour la première fois cette année. Les actions américaines reculent, les investisseurs se repositionnent sur l\'or et les Treasuries courts.',
    url: 'https://247wallst.com/investing/2026/03/20/the-sp-falls-close-to-1-as-oil-blasts-past-100-a-barrel/'
  },
  {
    cat: 'rates', time: '14:15', date: '2026-03-20', impact: 'high',
    title: 'Fed — baisse repoussée à décembre, taux longs en nette hausse',
    excerpt: 'La pression inflationniste du pétrole fait grimper les taux longs. Le marché repousse la prochaine baisse Fed de juillet à décembre 2026.',
    url: 'https://www.cnbc.com/amp/2026/03/20/us-treasury-yields-edge-higher.html'
  },
  {
    cat: 'macro', time: '14:15', date: '2026-03-19', impact: 'high',
    title: 'BCE — statu quo à 2,15%, inflation révisée à 2,6%, croissance à 0,9%',
    excerpt: 'La BCE maintient ses taux. Ses nouvelles projections révisent l\'inflation à la hausse et la croissance à la baisse pour 2026.',
    url: 'https://www.cnbc.com/2026/03/19/ecb-boe-swiss-national-bank-interest-rate-decisions.html'
  },
  {
    cat: 'macro', time: '20:00', date: '2026-03-18', impact: 'high',
    title: 'Fed — statu quo à 3,50–3,75%, une seule baisse prévue en 2026',
    excerpt: 'Le FOMC maintient ses taux pour la 3e réunion consécutive. Le dot plot pointe vers une seule réduction en 2026. Le S&P 500 cède 2%.',
    url: 'https://www.cnbc.com/2026/03/18/fed-interest-rate-decision-march-2026.html'
  },
]

export const MACRO_CALENDAR: CalendarEvent[] = [
  { time: '10:00', flag: '🇪🇺', event: 'Production industrielle (jan.)', prev: '-0.2%', cons: '+0.4%', impact: 'mid' },
  { time: '11:00', flag: '🇩🇪', event: 'ZEW Sentiment (mars)', prev: '26.0', cons: '30.5', impact: 'high' },
  { time: '13:30', flag: '🇺🇸', event: 'Empire State Mfg (mars)', prev: '5.7', cons: '6.2', impact: 'low' },
  { time: '14:15', flag: '🇺🇸', event: 'Retail Sales MoM (fév.)', prev: '-0.9%', cons: '+0.6%', impact: 'high' },
  { time: '15:00', flag: '🇺🇸', event: 'Business Inventories', prev: '+0.2%', cons: '+0.3%', impact: 'low' },
  { time: '19:30', flag: '🇺🇸', event: 'Discours Williams (Fed)', prev: '—', cons: '—', impact: 'mid' },
]

export const KEY_LEVELS: KeyLevel[] = [
  { asset: 'EUR/USD',     price: 1.1572, support: 1.1510, resist: 1.1600, fill: 48 },
  { asset: 'UST 10Y',    price: 4.39,   support: 4.20,   resist: 4.60,   fill: 70 },
  { asset: 'iTraxx Main', price: 72,    support: 60,     resist: 88,     fill: 43 },
  { asset: 'Gold',        price: 4547,  support: 4400,   resist: 4700,   fill: 65 },
  { asset: 'WTI',         price: 99.8,  support: 92.0,   resist: 110.0,  fill: 43 },
]
