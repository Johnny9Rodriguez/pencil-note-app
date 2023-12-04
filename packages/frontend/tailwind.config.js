/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'bgLight': '#10222E',
        'bgDark': '#01111E',
        'brightCrimson': '#F22952',
        'brightTeal': '#00C6B1',
        'darkTeal': '#004C5B'
      },
      maxWidth: {
        '1280': '1280px',
        '1024': '1024px'
      },
      maxHeight: {
        '600': '600px'
      }
    },
    screens: {
      sm: '480px',
      md: '768px'
    }
  },
  plugins: [],
}

