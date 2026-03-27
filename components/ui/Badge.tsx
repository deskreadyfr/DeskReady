import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'purple' | 'green' | 'red'
}

export default function Badge({ children, className, variant = 'default' }: Props) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variant === 'default' && 'bg-[rgba(124,58,237,0.15)] text-purple-soft border border-[rgba(168,85,247,0.2)]',
      variant === 'purple' && 'bg-[rgba(168,85,247,0.15)] text-purple-glow',
      variant === 'green' && 'bg-[rgba(34,197,94,0.15)] text-up',
      variant === 'red' && 'bg-[rgba(239,68,68,0.15)] text-down',
      className
    )}>
      {children}
    </span>
  )
}
