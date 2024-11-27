"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AvatarMenuDropdown } from "./profile";
import { IsLogin } from "@/util/account/profile/action";

const login: ReactNode = <AvatarMenuDropdown />;
const notLogin: ReactNode = (
	<Link
		href={"/account/signin"}
		key={"SignIn"}
		className="hover:bg-space-4 hover:text-space-1 transition-all font-bold duration-300 rounded py-2 px-4"
	>
		{"Login / Sign Up"}
	</Link>
);
export default function ProfileAvatar() {
	const [profileState, setProfile] = useState<ReactNode>(notLogin);

	useEffect(() => {
		async function getValidation() {
			const validation = await IsLogin();

			setProfile(validation ? login : notLogin);
		}
		getValidation();
	}, []);

	return <>{profileState}</>;
}
