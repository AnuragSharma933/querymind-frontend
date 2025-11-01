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
        primary: {
          pink: '#ec4899',
          purple: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}