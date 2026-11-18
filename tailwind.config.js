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
        'deep-night': '#14030c',
        'wine-dark': '#230615',
        'ruby-deep': '#590d22',
        'ruby': '#a4133c',
        'crimson': '#c9184a',
        'rose-red': '#ff0054',
        'hot-pink': '#ff2a70',
        'rose-bright': '#ff4d6d',
        'rose-pink': '#ff758f',
        'soft-pink': '#ffb3c1',
        'blush': '#ffe5ec',
        'blush-glow': '#ffd1dc',
        'rose-gold': '#f4a5ae',
        'champagne': '#fed7aa',
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
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
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
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 77, 109, 0.35)' },
          '50%': { boxShadow: '0 0 45px rgba(255, 0, 84, 0.65)' },
        },
      },
    },
  },
  plugins: [],
}
