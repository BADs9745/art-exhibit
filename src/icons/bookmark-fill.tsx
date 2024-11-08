import type { SVGAttributes } from "react";

export default function BookmarkFillIcon(
	props: SVGAttributes<HTMLOrSVGElement>,
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			{...props}
		>
			<title>Bookmark Fill Icon</title>
			<path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
		</svg>
	);
}
