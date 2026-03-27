export interface Greeks {
  price: number
  delta: number
  gamma: number
  vega: number
  theta: number
  rho: number
}

export function normCdf(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.SQRT2
  const t = 1 / (1 + p * x)
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return 0.5 * (1 + sign * y)
}

export function normPdf(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
}

export function blackScholes(S: number, K: number, T: number, r: number, sigma: number, isCall: boolean): Greeks | null {
  if (T <= 0) return null
  const sqrtT = Math.sqrt(T)
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT)
  const d2 = d1 - sigma * sqrtT
  const Nd1 = normCdf(d1), Nd2 = normCdf(d2), Nmd1 = normCdf(-d1), Nmd2 = normCdf(-d2)
  const disc = Math.exp(-r * T)
  const phi = normPdf(d1)
  const price = isCall ? S * Nd1 - K * disc * Nd2 : K * disc * Nmd2 - S * Nmd1
  const delta = isCall ? Nd1 : Nd1 - 1
  const gamma = phi / (S * sigma * sqrtT)
  const vega = S * phi * sqrtT / 100
  const theta = isCall
    ? (-(S * phi * sigma) / (2 * sqrtT) - r * K * disc * Nd2) / 252
    : (-(S * phi * sigma) / (2 * sqrtT) + r * K * disc * Nmd2) / 252
  const rho = isCall ? K * T * disc * Nd2 / 100 : -K * T * disc * Nmd2 / 100
  return { price, delta, gamma, vega, theta, rho }
}

export function binomialCRR(S: number, K: number, T: number, r: number, sigma: number, isCall: boolean, N: number): Greeks {
  function binom(s: number, t: number, sig: number, rr: number): number {
    const dt = t / N, u = Math.exp(sig * Math.sqrt(dt)), d = 1 / u
    const disc = Math.exp(-rr * dt), p = (Math.exp(rr * dt) - d) / (u - d), q = 1 - p
    let v: number[] = []
    for (let i = 0; i <= N; i++) {
      const ST = s * Math.pow(u, N - i) * Math.pow(d, i)
      v.push(isCall ? Math.max(0, ST - K) : Math.max(0, K - ST))
    }
    for (let step = N - 1; step >= 0; step--) {
      const nv: number[] = []
      for (let i = 0; i <= step; i++) nv.push(disc * (p * v[i] + q * v[i + 1]))
      v = nv
    }
    return v[0]
  }
  const price = binom(S, T, sigma, r)
  const eS = S * 0.001, ev = sigma * 0.001, et = T > 1 / 252 ? 1 / 252 : T * 0.01, er = 0.0001
  const pu = binom(S + eS, T, sigma, r), pd = binom(S - eS, T, sigma, r)
  const delta = (pu - pd) / (2 * eS)
  const gamma = (pu - 2 * price + pd) / (eS * eS)
  const vega = (binom(S, T, sigma + ev, r) - binom(S, T, sigma - ev, r)) / (2 * ev * 100)
  const theta = (binom(S, T - et, sigma, r) - price) / et / 252 * (1 / 252)
  const rho = (binom(S, T, sigma, r + er) - binom(S, T, sigma, r - er)) / (2 * er * 100)
  return { price, delta, gamma, vega, theta, rho }
}

export function monteCarlo(S: number, K: number, T: number, r: number, sigma: number, isCall: boolean, nSims: number): Greeks | null {
  const drift = r - 0.5 * sigma * sigma, vol = sigma * Math.sqrt(T)
  let sum = 0
  for (let i = 0; i < nSims; i++) {
    const u1 = Math.random() || 1e-10, u2 = Math.random()
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    const ST = S * Math.exp(drift * T + vol * z)
    sum += isCall ? Math.max(0, ST - K) : Math.max(0, K - ST)
  }
  const price = Math.exp(-r * T) * sum / nSims
  const bs = blackScholes(S, K, T, r, sigma, isCall)
  if (!bs) return null
  return { price, delta: bs.delta, gamma: bs.gamma, vega: bs.vega, theta: bs.theta, rho: bs.rho }
}
