"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { IsLogin } from "@/app/account/action";
import { AvatarMenuDropdown } from "./profile";

const login: ReactNode = <AvatarMenuDropdown />;
const notLogin: ReactNode = (
	<Link
		href={"/account/signin"}
		key={"SignIn"}
		className="hover:bg-space-4 hover:text-space-1 transition-all duration-300 rounded py-2 px-4"
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

	return profileState;
}
