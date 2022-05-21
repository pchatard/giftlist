const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        layout: "calc(100vh - 15rem)",
      },
      colors: {
        primary: {
          default: colors.indigo[600],
          hover: colors.indigo[700],
          light: colors.indigo[100],
          lightHover: colors.indigo[200],
          text: colors.indigo[900]
        },
        secondary: {
          default: colors.gray[100],
          hover: colors.gray[200],
          text: colors.indigo[600]
        },
        success: {
          default: colors.green[600],
          hover: colors.green[700],
          light: colors.green[100],
          lightHover: colors.green[200],
          text: colors.green[900]
        },
        danger: {
          default: colors.red[600],
          hover: colors.red[700],
          light: colors.red[100],
          lightHover: colors.red[200],
          text: colors.red[900]
        }
      }
    },
  },
  plugins: [],
}
