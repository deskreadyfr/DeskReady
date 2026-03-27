'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ModelTabs from '@/components/pricer/ModelTabs'
import InputPanel from '@/components/pricer/InputPanel'
import ResultsPanel from '@/components/pricer/ResultsPanel'
import PayoffChart from '@/components/pricer/PayoffChart'
import { blackScholes, binomialCRR, monteCarlo, type Greeks } from '@/lib/pricer-math'

export default function PricerPage() {
  const [model, setModel] = useState('bs')
  const [values, setValues] = useState({
    S: 100, K: 100, T: 252, r: 5, sigma: 20, N: 200, nSims: 50000,
    type: 'call' as 'call' | 'put',
  })
  const [result, setResult] = useState<Greeks | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function calculate() {
    const { S, K, T, r, sigma, type, N, nSims } = values
    if ([S, K, T, r, sigma].some(v => isNaN(v) || v <= 0)) {
      setError('Tous les paramètres doivent être positifs.')
      return
    }
    setError('')
    setLoading(true)
    const isCall = type === 'call'
    const rDec = r / 100
    const sigmaDec = sigma / 100
    const TYears = T / 252

    setTimeout(() => {
      let res: Greeks | null = null
      if (model === 'bs') res = blackScholes(S, K, TYears, rDec, sigmaDec, isCall)
      else if (model === 'binomial') res = binomialCRR(S, K, TYears, rDec, sigmaDec, isCall, N)
      else res = monteCarlo(S, K, TYears, rDec, sigmaDec, isCall, nSims)
      setResult(res)
      setLoading(false)
    }, model === 'mc' ? 80 : 0)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <div className="max-w-[1100px] mx-auto px-8 py-12 relative z-10">
          {/* Header */}
          <div className="mb-10">
            <div className="text-purple-glow text-xs font-semibold tracking-widest uppercase mb-2">Ressources</div>
            <h1 className="font-raleway font-black text-dr-white text-3xl md:text-4xl leading-tight mb-2" style={{ letterSpacing: '-0.03em' }}>
              Options Pricer
            </h1>
            <p className="text-dr-grey text-sm font-light">Prix et Grecs des options européennes. Black-Scholes, Binomial CRR, Monte Carlo.</p>
          </div>

          {/* Model tabs */}
          <ModelTabs model={model} onChange={m => { setModel(m); setResult(null) }} />

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            {/* Input */}
            <InputPanel
              values={values}
              model={model}
              onChange={setValues}
              onCalculate={calculate}
              loading={loading}
              error={error}
            />

            {/* Output */}
            <div className="flex flex-col gap-4">
              <ResultsPanel
                result={result}
                model={model}
                isCall={values.type === 'call'}
                S={values.S}
                K={values.K}
                T={values.T}
                sigma={values.sigma / 100}
                r={values.r / 100}
              />
              <PayoffChart
                S={values.S}
                K={values.K}
                isCall={values.type === 'call'}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
