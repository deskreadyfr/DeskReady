export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-purple-glow text-xs font-semibold tracking-widest uppercase mb-3">
      <span className="w-5 h-px bg-purple-glow opacity-60" />
      {children}
      <span className="w-5 h-px bg-purple-glow opacity-60" />
    </div>
  )
}
