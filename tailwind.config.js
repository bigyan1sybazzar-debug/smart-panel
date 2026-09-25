/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
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


const installationTools = [
  {
    name: "Drill",
    description: "Standard cordless drill for pilot holes and fasteners.",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=450&fit=crop&q=80",
  },
  {
    name: "Screwdriver",
    description: "Quick assembly of panel brackets and trims.",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&h=450&fit=crop&q=80",
  },
  {
    name: "Level",
    description: "Ensures perfectly straight panel alignment.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=450&fit=crop&q=80",
  },
  {
    name: "Measuring Tape",
    description: "Fast, accurate cuts and positioning.",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=450&fit=crop&q=80",
  },
  {
    name: "Caulk Gun",
    description: "Clean sealing at joints and edges.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=450&fit=crop&q=80",
  },
];