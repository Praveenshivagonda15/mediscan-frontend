import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // Glass surface tokens
        glass: {
          50:  'rgba(255,255,255,0.02)',
          100: 'rgba(255,255,255,0.04)',
          200: 'rgba(255,255,255,0.06)',
          300: 'rgba(255,255,255,0.08)',
          400: 'rgba(255,255,255,0.12)',
          500: 'rgba(255,255,255,0.16)',
        },
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      boxShadow: {
        'glass': '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 32px -8px rgba(0,0,0,0.4)',
        'glow': '0 0 32px -4px rgba(52,211,153,0.45)',
        'glow-sm': '0 0 20px -4px rgba(52,211,153,0.35)',
        'inner-hi': 'inset 0 1px 0 0 rgba(255,255,255,0.08)',
      },
      animation: {
        'float': 'float 12s ease-in-out infinite',
        'float-slow': 'float 18s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%':      { transform: 'translate(-20px, 20px) scale(0.98)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;