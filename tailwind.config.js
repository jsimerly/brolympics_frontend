/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        error: {
          DEFAULT: '#C76C63'
        }
      }
    },
  },
  plugins: [],
}
