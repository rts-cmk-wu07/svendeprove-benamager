/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        grey: "##EAEAEA",
        primary: "#5E2E53",
        secondary: "#E1A1E9",
        black: "#000000"
      }
    },
  },
  plugins: [],
}
