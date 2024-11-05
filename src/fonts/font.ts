import LocalFont from "next/font/local";

export const geistSans = LocalFont({
	src: "./GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "variable",
});

export const geistMono = LocalFont({
	src: "./GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const jockeOne = LocalFont({
	src: [
		{
			path: "./JockeyOne.ttf",
			weight: "400",
			style: "normal",
		},
	],
});
