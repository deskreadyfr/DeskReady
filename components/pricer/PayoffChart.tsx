'use client'
import { useRef, useEffect } from 'react'

interface Props {
  S: number
  K: number
  isCall: boolean
}

export default function PayoffChart({ S, K, isCall }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const cssW = canvas.offsetWidth
    const cssH = 180

    canvas.width = cssW * dpr
    canvas.height = cssH * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const range = K * 0.6
    const N = 300
    const prices = Array.from({ length: N }, (_, i) => K - range + 2 * range / (N - 1) * i)
    const payoffs = prices.map(p => isCall ? Math.max(0, p - K) : Math.max(0, K - p))
    const maxP = Math.max(...payoffs, 1)

    const padL = 48, padR = 16, padT = 18, padB = 28
    const plotW = cssW - padL - padR, plotH = cssH - padT - padB

    const xPx = (p: number) => padL + (p - prices[0]) / (prices[N - 1] - prices[0]) * plotW
    const yPx = (v: number) => padT + plotH * (1 - v / maxP)

    ctx.clearRect(0, 0, cssW, cssH)

    // Grid lines
    ctx.strokeStyle = 'rgba(168,85,247,0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = padT + plotH / 4 * i
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + plotW, y); ctx.stroke()
      ctx.fillStyle = 'rgba(160,154,181,0.45)'
      ctx.font = '9px DM Sans,sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText((maxP * (1 - i / 4)).toFixed(1), padL - 6, y + 3)
    }

    // Zero line
    ctx.strokeStyle = 'rgba(168,85,247,0.2)'
    ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(padL, yPx(0)); ctx.lineTo(padL + plotW, yPx(0)); ctx.stroke()
    ctx.setLineDash([])

    // Strike line
    const kx = xPx(K)
    ctx.strokeStyle = 'rgba(168,85,247,0.35)'
    ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(kx, padT); ctx.lineTo(kx, padT + plotH); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = 'rgba(168,85,247,0.6)'
    ctx.font = '9px DM Sans,sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('K=' + K, kx, padT + plotH + 18)

    // Spot line
    if (S >= prices[0] && S <= prices[N - 1]) {
      const sx = xPx(S)
      ctx.strokeStyle = 'rgba(248,244,255,0.2)'
      ctx.setLineDash([2, 3])
      ctx.beginPath(); ctx.moveTo(sx, padT); ctx.lineTo(sx, padT + plotH); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = 'rgba(248,244,255,0.4)'
      ctx.font = '9px DM Sans,sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('S=' + S, sx, padT - 4)
    }

    // Fill gradient
    const col = isCall ? '34,197,94' : '239,68,68'
    const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH)
    grad.addColorStop(0, `rgba(${col},0.28)`)
    grad.addColorStop(1, `rgba(${col},0.03)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(xPx(prices[0]), yPx(0))
    prices.forEach((p, i) => ctx.lineTo(xPx(p), yPx(payoffs[i])))
    ctx.lineTo(xPx(prices[N - 1]), yPx(0))
    ctx.closePath()
    ctx.fill()

    // Payoff line
    ctx.strokeStyle = isCall ? '#22c55e' : '#ef4444'
    ctx.lineWidth = 2
    ctx.beginPath()
    prices.forEach((p, i) =>
      i === 0 ? ctx.moveTo(xPx(p), yPx(payoffs[i])) : ctx.lineTo(xPx(p), yPx(payoffs[i]))
    )
    ctx.stroke()
  }, [S, K, isCall])

  return (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-4">
      <div className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-3">Profil de payoff à maturité</div>
      <canvas ref={canvasRef} className="w-full" style={{ height: 180, display: 'block' }} />
    </div>
  )
}
