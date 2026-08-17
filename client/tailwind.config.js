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
          primary: "#FAF7F2",
          secondary: "#F3EEE7",
          card: "#F3EEE7",
        },
        border: "#E6DED3",
        semantic: {
          success: "#3A7D44",
          warning: "#E09F3E",
          error: "#C44536",
          info: "#457B9D",
        }
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '18px',
        'xl': '20px',
        'button': '18px',
        'card': '20px',
        'modal': '20px',
        'input': '16px'
      },
      boxShadow: {
        'raised': 'none',
        'pressed': 'none',
        'hover': 'none',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

