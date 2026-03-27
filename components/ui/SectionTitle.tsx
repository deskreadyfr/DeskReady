import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function SectionTitle({ children, className }: Props) {
  return (
    <h2 className={cn(
      'font-syne font-extrabold text-3xl md:text-4xl text-dr-white leading-tight',
      className
    )}>
      {children}
    </h2>
  )
}
