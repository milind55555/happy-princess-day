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
        twilight: '#0f0a1e',
        'twilight-mid': '#1a1033',
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
        'float': 'gentle-float 6s ease-in-out infinite',
        'float-slow': 'gentle-float 10s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
      keyframes: {
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(1deg)' },
          '50%': { transform: 'translateY(-16px) rotate(0deg)' },
          '75%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
