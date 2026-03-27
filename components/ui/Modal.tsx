'use client'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function Modal({ open, onClose, children, className }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn('bg-[#0d0d14] border border-[rgba(168,85,247,0.2)] rounded-2xl p-8 max-w-lg w-full mx-4 relative', className)}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
