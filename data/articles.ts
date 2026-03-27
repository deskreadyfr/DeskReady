import type { Article } from '@/types/blog'

export const ARTICLES: Article[] = []

export const CATEGORIES: Record<string, string> = {
  all: 'Tous',
  technique: 'Technique',
  networking: 'Networking',
  entretien: 'Entretien',
  marche: 'Marchés',
  carriere: 'Carrière',
}
