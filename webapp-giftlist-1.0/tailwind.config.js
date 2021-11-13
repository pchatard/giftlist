module.exports = {
	purge: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {},
			minHeight: {
				layout: "calc(100vh - 15rem)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
