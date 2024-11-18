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
				wiggle: "wiggle 500ms cubic-bezier(0.4, 0, 0.2, 1) infinite alternate",
				shake: "shake 500ms ease-in-out infinite alternate",
			},
			keyframes: {
				shake: {
					0: { transform: "translateY(0px)" },
					"50%": { transform: "translateY(3px)" },
					"100%": { transform: "translateY(-3px)" },
				},
				wiggle: {
					"0%": { transform: "rotateZ(0deg)" },
					"50%": { transform: "rotateZ(20deg)" },
					"100%": { transform: "rotateZ(-20deg)" },
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
