"use client";

import { motion } from "framer-motion";

export default function AnimateSvgPage(param: {
	params: { [key: string]: string };
	searchParams: { [key: string]: string };
}) {
	console.log(param.searchParams.ain);
	return (
		<>
			<motion.svg
				aria-hidden="true"
				focusable="false"
				height="1em"
				role="presentation"
				viewBox="0 -960 960 960"
				// viewBox="0 0 24 24"
				width="1em"
				className={"stroke-black size-52 fill-red-500"}
			>
				<title>Mail Icon</title>
				<motion.path
					d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
					animate={{
						// pathLength: [1, 0, 1],
						// pathOffset: [0, 1, 0],
						d: "M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z",
						transition: {
							duration: 5,
							repeat: Number.POSITIVE_INFINITY,
							staggerDirection: -1,
						},
					}}
				/>
			</motion.svg>
		</>
	);
}
