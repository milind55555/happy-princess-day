/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twilight: '#1a1033',
        'rose-gold': '#e8b4b8',
        champagne: '#f5d98b',
        lavender: '#c9b6ff',
        blush: '#ffd6e8',
        rose: '#d45087',
        gold: '#c9a227',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'whoosh': 'whoosh 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'draw': 'draw 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        whoosh: {
          '0%': { transform: 'translateX(-40px) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        draw: {
          '0%': { strokeDasharray: '1000', strokeDashoffset: '1000' },
          '100%': { strokeDasharray: '1000', strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
