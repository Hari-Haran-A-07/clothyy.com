/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0B',
          dark: '#121316',
          charcoal: '#1C1D22',
          slate: '#2C2D35',
          muted: '#6E707A',
          border: '#E3E1DC',
          'border-dark': '#26272E',
          sand: '#EFECE6',
          alabaster: '#F6F5F2',
          cream: '#FAF9F6',
          gold: '#C5A880',
          'gold-light': '#DFC8A8',
          'gold-dark': '#9A7B54',
          ochre: '#A37A4C',
          olive: '#4A5340',
          terracotta: '#A65B47',
          success: '#1B6B4A',
          warning: '#B8741A',
          error: '#BD2727'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Didot', 'Georgia', 'serif'],
        display: ['Cinzel', '"Cormorant Garamond"', 'Didot', 'serif'],
        sans: ['Outfit', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        arabic: ['"Tajawal"', '"IBM Plex Sans Arabic"', 'sans-serif']
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.35em',
      },
      aspectRatio: {
        'fashion': '3 / 4',
        'editorial': '4 / 5',
        'tall': '9 / 16',
        'wide': '16 / 9',
        'cinema': '21 / 9'
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'luxury-hover': '0 30px 60px -20px rgba(0, 0, 0, 0.15)',
        'modal': '0 25px 80px -10px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
