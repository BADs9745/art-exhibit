import type { HTMLAttributes } from "react";

export default function ProfileSideBard({
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<aside {...props}>
			<ul>
				<li>General</li>
			</ul>
		</aside>
	);
}
