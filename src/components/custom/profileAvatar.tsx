"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AvatarMenuDropdown } from "./profile";
import { IsLogin } from "@/util/account/profile/action";
import { useDebouncedCallback } from "use-debounce";

const login: ReactNode = <AvatarMenuDropdown />;
const notLogin: ReactNode = (
	<Link
		href={"/account/signin"}
		key={"SignIn"}
		className="hover:bg-space-4 hover:text-space-1 transition-all font-semibold duration-300 rounded py-2 px-4 text-nowrap border-space-4 border-1"
	>
		{"Sign In"}
	</Link>
);
export default function ProfileAvatar() {
	const [profileState, setProfile] = useState<ReactNode>(notLogin);
	const getValidationDebounce = useDebouncedCallback(async () => {
		const validation = await IsLogin();
		setProfile(validation ? login : notLogin);
		console.log("first");
	}, 150);

	useEffect(() => {
		getValidationDebounce();
	}, [getValidationDebounce]);

	return <>{profileState}</>;
}
