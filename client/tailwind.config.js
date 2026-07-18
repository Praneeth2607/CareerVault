/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6F1D1B",
        secondary: "#BB9457",
        heading: "#432818",
        accent: "#99582A",
        bg: {
          primary: "#FFFAEE",
          secondary: "#FFF5DC",
          card: "#FFF8E6",
        },
        semantic: {
          success: "#3A7D44",
          warning: "#E09F3E",
          error: "#C44536",
          info: "#457B9D",
        }
      },
      borderRadius: {
        'sm': '12px',
        'md': '18px',
        'lg': '24px',
        'xl': '32px',
        'button': '18px',
        'card': '24px',
        'modal': '28px'
      },
      boxShadow: {
        'raised': '-8px -8px 16px rgba(255,255,255,0.7), 8px 8px 16px rgba(67,40,24,0.15)',
        'pressed': 'inset 4px 4px 8px rgba(67,40,24,0.15), inset -4px -4px 8px rgba(255,255,255,0.8)',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
