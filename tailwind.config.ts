import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			animation: {
				"spin-3": "spin 3s linear infinite",
				wiggle: "wiggle 3s linear infinite",
				beat: "beat 500ms ease-in-out infinite alternate",
			},
			keyframes: {
				beat: {
					to: { transform: "scale(1.25)" },
				},
				wiggle: {
					"0%": { transform: "rotateX(0deg)" },
					"50%": { transform: "rotateX(3deg)" },
					"100%": { transform: "rotateX(-3deg)" },
				},
			},
			colors: {
				space: {
					1: "#1B262C",
					2: "#0F4C75",
					3: "#3282B8",
					4: "#BBE1FA",
				},
			},
		},
	},
	plugins: [nextui()],
};
export default config;
