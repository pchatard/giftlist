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
    },
  },
  plugins: [],
}
