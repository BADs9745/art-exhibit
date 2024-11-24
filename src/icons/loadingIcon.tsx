"use client";
import { motion } from "framer-motion";
import type { SVGAttributes } from "react";

export default function LoadingIcon(props: SVGAttributes<SVGElement>) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 50 50"
			width="25"
			height="25"
			initial={{ rotate: 0 }}
			animate={{ rotate: 360 }}
			transition={{
				repeat: Number.POSITIVE_INFINITY,
				duration: 1,
				ease: "linear",
			}}
		>
			<title>Loading</title>
			{/* Circle Outline */}

			{/* Animated Circle */}
			<motion.circle
				className={props.className}
				cx="25"
				cy="25"
				r="20"
				stroke="#007bff"
				strokeWidth="5"
				fill="none"
				strokeDasharray="125.6"
				strokeDashoffset="125.6"
				animate={{ strokeDashoffset: 0 }}
				transition={{
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
					duration: 2.5,
					ease: "easeInOut",
				}}
			/>
		</motion.svg>
	);
}
