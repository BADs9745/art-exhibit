"use client";
import { IsLogin, LogOut, UserProfile } from "@/app/account/action";
import PersonIcon from "@/icons/person";
import type { $Enums, Pengguna } from "@prisma/client";
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
						"flex flex-col cursor-pointer *:rounded-xl items-start absolute top-1 p-3 right-0 *:text-medium *:font-semibold *:duration-300 *:p-3 space-y-2 p- w-72 duration-300 bg-space-1 mt-2 ring-space-4 ring-1 rounded-[0.5rem] *:w-full *:text-start"
					}
				>
					<div className="hover:bg-space-3 hover:text-space-1">
						<div className="capitalize text-xl">
							{profile.nama.toLowerCase()}
							<p className="text-sm">{profile.email}</p>
							<p className="text-lg font-bold">
								{profile.peran.toLocaleLowerCase()}
							</p>
						</div>
					</div>
					<div className="hover:bg-space-3 hover:text-space-1">Bookmark</div>
					<div className="hover:bg-space-3 hover:text-space-1">
						Notification
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
