/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darker': '#352F44',
        'dark': '#5C5470',
        'light': '#B9B4C7',
        'lighter': '#FAF0E6'
      },
    },
  },
  plugins: [],
}

