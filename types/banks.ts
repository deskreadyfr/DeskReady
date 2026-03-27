export interface BankData {
  desks?: string[]
  stats?: Record<string, string>
  culture?: string
  process?: string[]
  attentes?: string[]
}

export interface Bank {
  id: string
  name: string
  type: string
  icon: string
  category: string
  desc: string
  available: boolean
  tags: string[]
  data?: BankData
}
