/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      'sm': { min: "267px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        background: "#F5F7FB",
        violet: "#4D5B9E",
        darkViolet: "#293264",
        answered: "#D6DBF5",
        correct: "#94D7A2"
      },
    },
  },
  plugins: [],
};