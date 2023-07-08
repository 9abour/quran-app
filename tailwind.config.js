/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"primary-color": "var(--primary-color)",
				"primary-color-2": "var(--primary-color-2)",
				"primary-color-3": "var(--primary-color-2)",
				"primary-color-4": "var(--primary-color-2)",
				"primary-color-5": "var(--primary-color-5)",
				"primary-color-6": "var(--primary-color-6)",
				"primary-gray": "var(--primary-gray)",
				"primary-gray-2": "var(--primary-gray-2)",
				"primary-gray-3": "var(--primary-gray-3)",
			},
		},
	},
	plugins: [],
};
