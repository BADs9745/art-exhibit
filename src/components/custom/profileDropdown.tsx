"use client";
import {
	IsLogin,
	LogOut,
	ToMyProfile,
	UserProfile,
} from "@/app/account/action";
import BookmarkFillIcon from "@/icons/bookmark-fill";
import NotificationFillIcon from "@/icons/notification-fill";
import PersonIcon from "@/icons/person";
import SettingIcon from "@/icons/setting";
import type { $Enums } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type profileData = {
	peran: $Enums.Peran;
	nama: string;
	email: string;
};

export default function ProfileDropdown() {
	const dropdownItem = useRef<HTMLDivElement>(null);
	const [profile, setProfile] = useState<profileData>({
		nama: "",
		email: "",
		peran: "PELANGGAN",
	});
	const handler = () => {
		dropdownItem.current?.focus();
	};

	useEffect(() => {
		const getProfile = async () => {
			const token = await IsLogin();
			const profileData = await UserProfile(token ?? "none");

			setProfile(
				profileData ?? {
					nama: "",
					email: "",
					peran: "PELANGGAN",
				},
			);
		};
		getProfile();
	}, []);

	return (
		<div className="relative group">
			<div
				className={
					"flex size-12 relative rounded-full bg-space-4 items-center justify-center hover:bg-opacity-80 duration-300"
				}
			>
				<button
					onClick={handler}
					type="button"
					key={"Dropdown Trigger"}
					className={clsx(
						"rounded-full size-10 absolute bg-transparent group-focus-within:hidden",
					)}
				/>
				<span className="*:size-7 fill-slate-700">{<PersonIcon />}</span>
			</div>
			<div
				// Dropdown Menu
				key={"Dropdown Menu"}
				className={clsx(
					"duration-300 relative focus:scale-100 focus:opacity-100 scale-0 opacity-0 menu",
				)}
				tabIndex={-1}
				ref={dropdownItem}
			>
				<div
					className={
						"flex flex-col cursor-pointer *:rounded-xl items-start absolute top-1 p-3 right-0 *:text-medium *:font-semibold *:duration-300 *:p-3 space-y-2 p- w-72 duration-300 bg-space-2 mt-2 rounded-[0.5rem] *:w-full *:text-start"
					}
				>
					<div
						className="hover:bg-space-3 hover:text-space-1 capitalize group/profile"
						onClick={() => {
							ToMyProfile();
						}}
						onKeyDown={() => {}}
					>
						{profile.nama.toLowerCase()}
						<p className="text-sm">{profile.email}</p>
						<div className="flex items-center">
							<p className="text-lg font-bold flex-1">
								{profile.peran.toLocaleLowerCase()}
							</p>
							<SettingIcon className="group-hover/profile:animate-spin-3 fill-space-4 group-hover/profile:fill-space-1" />
						</div>
					</div>
					<div className="hover:bg-space-3 hover:text-space-1 flex group/bookmarks">
						<span className="flex-1">Bookmark</span>{" "}
						<BookmarkFillIcon className=" group-hover/profile:fill-space-1 fill-space-4 group-hover/bookmarks:fill-space-1 group-hover/bookmarks:animate-beat" />
					</div>
					<div className="hover:bg-space-3 hover:text-space-1 group/notifications flex">
						<span className="flex-1">Notification</span>{" "}
						<NotificationFillIcon className="fill-space-4 group-hover/notifications:fill-space-1 group-hover/notifications:animate-wiggle" />
					</div>
					<div
						className="text-red-500 hover:bg-red-500 hover:text-white"
						onKeyDown={() => {}}
						onClick={() => {
							LogOut();
						}}
					>
						Log Out
					</div>
				</div>
			</div>
		</div>
	);
}
