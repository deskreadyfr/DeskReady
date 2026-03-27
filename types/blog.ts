export interface Article {
  id: number
  title: string
  excerpt: string
  icon: string
  tag: string
  category: string
  readTime: string
  date: string
  author: string
  authorInitials: string
  featured?: boolean
  url?: string
}
