import type { ReactNode } from "react";
import ProfileSideBard from "./components/sidebar";

export default function ProfileTemplate({ children }: { children: ReactNode }) {
	return (
		<section className="flex w-screen">
			<ProfileSideBard />
			<div className="w-full bg-space-1">{children}</div>
		</section>
	);
}
