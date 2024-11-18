import LocalFont from "next/font/local";

export const jockeOne = LocalFont({
	src: "./JockeyOne.ttf",
	variable: "--font-jockey-one",
});

export const kreon = LocalFont({
	src: "./Kreon.ttf",
	variable: "--font-kreon",
});

export const montserrat = LocalFont({
	src: [
		{
			path: "Montserrat-Italic-VariableFont_wght.ttf",
			weight: "100 900",
			style: "italic",
		},
		{
			path: "Montserrat-VariableFont_wght.ttf",
			weight: "100 900",
			style: "normal",
		},
	],
});
