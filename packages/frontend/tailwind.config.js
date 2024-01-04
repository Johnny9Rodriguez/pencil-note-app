/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'bgLight': '#10222E',
        'bgDark': '#01111E',
        'brightCrimson': '#DC143C',
        'brightTeal': '#00C6B1',
        'darkTeal': '#004C5B'
      },
      width: {
        '256': '256px'
      },
      maxWidth: {
        '1280': '1280px',
        '1024': '1024px'
      },
      minWidth: {
        '390': '390px',
        '256': '256px'
      },
      maxHeight: {
        '600': '600px'
      },
      minHeight: {
        '480': '480px'
      },
      animation: {
        'error-shake': 'shake 0.5s',
        'sync-spin': 'reverseSpin 3s linear infinite'
      },
      keyframes: {
        shake: {
          '0%, 100%': {transform: 'translateX(0)'},
          '25%': {transform: 'translateX(-5px)'},
          '50%': {transform: 'translateX(5px)'},
          '75%': {transform: 'translateX(-5px)'},
        },
        reverseSpin: {
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(-360deg)'}, 
        }
      }
    },
    screens: {
      sm: '440px',
      md: '768px'
    }
  },
  plugins: [],
}

