const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      satisfy: ["Satisfy"],
    },
    extend: {
      colors: {
        primary: colors.indigo,
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
