export type Priority = 'high' | 'mid' | 'low'
export type ContractType = 'CDI' | 'Stage' | 'Freelance'

export interface TrackerEntry {
  id: string
  bank: string
  desk: string
  type: string
  status: string
  priority: Priority
  date?: string
  contact?: string
  followup?: string
  notes?: string
  updatedAt?: string
}

export interface StatusConfig {
  color: string
  bg: string
  icon: string
  label: string
}
