/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1b75bc",
          "green-dark": "#145a9c",
          blue: "#1b75bc",
          "blue-dark": "#145a9c",
          accentGreen: "#2b8a3e",
          orange: "#f39a1f",
          cream: "#f4f8fa",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

