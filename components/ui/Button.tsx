import { cn } from '@/lib/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer font-sans',
        size === 'sm' ? 'px-3 py-1.5 text-sm rounded-md' : 'px-5 py-2.5 text-sm rounded-lg',
        variant === 'primary' && 'bg-purple-core text-dr-white hover:bg-purple-glow border-none',
        variant === 'ghost' && 'bg-transparent text-dr-white border border-[rgba(168,85,247,0.3)] hover:border-purple-glow hover:bg-[rgba(124,58,237,0.1)]',
        variant === 'outline' && 'bg-transparent text-dr-grey border border-[rgba(168,85,247,0.2)] hover:border-[rgba(168,85,247,0.4)] hover:text-dr-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
