/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        loading: "loading 0.5s linear infinite",
      },
      keyframes: {
        loading: {
          "0%": {
            transform: "translateX(-100%)",
          },

          "60%": {
            transform: "",
          },
          "100%": {
            transform: "translateX(220%)",
          },
        },
      },
    },
  },
  plugins: [],
};
