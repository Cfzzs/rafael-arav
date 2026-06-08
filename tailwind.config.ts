import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          amber:          '#F5A623',
          'amber-light':  '#F7B84B',
          'amber-dark':   '#E09010',
          graphite:       '#1A1A2E',
          'graphite-mid': '#252545',
          'graphite-dark':'#0F0F1A',
          orange:         '#E07B39',
          'orange-light': '#E8904F',
          'orange-dark':  '#C8652A',
          offwhite:       '#FAF7F2',
          charcoal:       '#2D2D2D',
        },
      },
      fontFamily: {
        headline: ['var(--font-sora)', 'Plus Jakarta Sans', 'sans-serif'],
        body:     ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand':       'linear-gradient(135deg, #F5A623 0%, #E07B39 100%)',
        'gradient-brand-hover': 'linear-gradient(135deg, #F7B84B 0%, #E8904F 100%)',
        'gradient-hero-overlay':'linear-gradient(180deg, rgba(26,26,46,0.55) 0%, rgba(15,15,26,0.92) 100%)',
        'gradient-dark-section':'linear-gradient(180deg, #1A1A2E 0%, #0F0F1A 100%)',
        'gradient-card-border': 'linear-gradient(135deg, #F5A623, #E07B39)',
      },
      boxShadow: {
        'brand-glow':    '0 0 30px rgba(245, 166, 35, 0.45)',
        'brand-glow-sm': '0 0 15px rgba(245, 166, 35, 0.25)',
        'card':          '0 4px 24px rgba(0,0,0,0.08)',
        'card-dark':     '0 8px 40px rgba(0,0,0,0.35)',
        'card-hover':    '0 12px 48px rgba(245, 166, 35, 0.15)',
      },
      animation: {
        'ticker-left':  'tickerLeft 40s linear infinite',
        'fade-in-up':   'fadeInUp 0.7s ease-out forwards',
        'float':        'float 3.5s ease-in-out infinite',
        'pulse-amber':  'pulseAmber 2.5s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        tickerLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseAmber: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 166, 35, 0.3)' },
          '50%':      { boxShadow: '0 0 45px rgba(245, 166, 35, 0.7)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
