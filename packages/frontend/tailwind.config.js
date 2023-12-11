/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'bgLight': '#10222E',
        'bgDark': '#01111E',
        'brightCrimson': '#BD0000',
        'brightTeal': '#00C6B1',
        'darkTeal': '#004C5B'
      },
      maxWidth: {
        '1280': '1280px',
        '1024': '1024px'
      },
      minWidth: {
        '390': '390px'
      },
      maxHeight: {
        '600': '600px'
      },
      minHeight: {
        '480': '480px'
      },
      animation: {
        'error-shake': 'shake 0.5s'
      },
      keyframes: {
        shake: {
          '0%, 100%': {transform: 'translateX(0)'},
          '25%': {transform: 'translateX(-5px)'},
          '50%': {transform: 'translateX(5px)'},
          '75%': {transform: 'translateX(-5px)'},
        }
      }
    },
    screens: {
      sm: '390px',
      md: '768px'
    }
  },
  plugins: [],
}

