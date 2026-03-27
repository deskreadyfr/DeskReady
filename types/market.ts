export interface Asset {
  cat: string
  name: string
  val: string
  chg: number
  chgAbs: string
}

export interface NewsItem {
  id?: string
  title: string
  excerpt: string
  time: string
  date: string
  cat: string
  impact: 'high' | 'mid' | 'low'
  url?: string
}

export interface CalendarEvent {
  time: string
  event: string
  flag: string
  prev: string
  cons: string
  impact: 'high' | 'mid' | 'low'
}

export interface KeyLevel {
  asset: string
  price: number
  support: number
  resist: number
  fill: number
}
