/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "color-blue": "#5770E5",
      },
      screens: {
        xs: "450px",
        lg: "1280px",
        xl: "1920px",
      },
    },
  },
  plugins: [],
}

