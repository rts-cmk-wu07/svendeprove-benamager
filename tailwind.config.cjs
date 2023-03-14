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
      },
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
        "racingSansOne": ["Racing Sans One", "cursive"],
      },
      fontSize: {
        base: "1.125rem",
        lg: "1.5rem",
        xl: "2.25rem",
      },
      gridTemplateColumns: {
        'auto-200': 'repeat(auto-fill, minmax(240px, 1fr))',
      },
    },
  },
  plugins: [
    // ...
    function ({ addUtilities }) {
      const newUtilities = {
        ".grid-area-1": {
          gridArea: "1 / 1 / 1 / 1",
        },
        ".text-stroke-top": {
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "2px #431567",
        },
        ".text-stroke-bottom": {
          WebkitTextFillColor: "#E856EB",
          WebkitTextStroke: "1px #000000",
        },
      }

      addUtilities(newUtilities)
    }
  ],
}
