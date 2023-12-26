/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/@nextui-org/theme/dist/components/button.js"
	],
	plugins: [nextui({
		defaultTheme: "dark",
		addCommonColors: true
	})],
}
