import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#050508',
        'purple-core': '#7c3aed',
        'purple-glow': '#a855f7',
        'purple-soft': '#c084fc',
        'purple-dim': '#3b0764',
        'dr-white': '#f8f4ff',
        'dr-grey': '#a09ab5',
        up: '#22c55e',
        down: '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        syne: ['var(--font-syne)', 'Syne', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(168,85,247,0.15)',
      },
    },
  },
  plugins: [],
}
export default config
