"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import type { $Enums } from "@prisma/client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SettingIcon from "@/icons/setting";
import { BookmarkIcon, LogOut as LogoutIcon } from "lucide-react";
import Link from "next/link";
import NotificationFillIcon from "@/icons/notification-fill";
import { LogOut, UserProfile } from "@/util/account/profile/action";
import clsx from "clsx";

type avatarMenuData = {
	peran: $Enums.Peran;
	nama: string;
	email: string;
};

export const AvatarPicture = ({ userId }: { userId?: string }) => {
	const [profileImg, setProfileImg] = useState<string>("");
	const searchParams = new URLSearchParams();
	let params = "";
	if (userId) {
		searchParams.set("userId", userId);
		params = `?${searchParams.toString()}`;
	}

	useEffect(() => {
		const GetAvatarImage = async () => {
			const imgData = await fetch(`/api/account/profile/picture${params}`, {
				method: "GET",
			});
			const blob = await imgData.blob();
			const blobUrl = URL.createObjectURL(blob);
			setProfileImg(blobUrl);
		};
		GetAvatarImage();
	}, [params]);
	return (
		<Avatar className="size-12 ring-space-4 ring-1">
			<AvatarImage alt="No Image" src={profileImg} />
		</Avatar>
	);
};

export const AvatarMenuDropdown = () => {
	const [profile, setProfile] = useState<avatarMenuData>({
		nama: "",
		email: "",
		peran: "PELANGGAN",
	});
	useEffect(() => {
		const getProfile = async () => {
			const profile = await UserProfile();

			setProfile(
				profile ?? {
					nama: "",
					email: "",
					peran: "PELANGGAN",
				},
			);
		};
		getProfile();
	}, []);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<AvatarPicture />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52 bg-space-2/50 cursor-default">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="group">
						{profile.nama}{" "}
						<span
							className={clsx(
								{ "animate-admin-badge text-black": profile.peran === "ADMIN" },
								{ "text-space-4": profile.peran === "PELANGGAN" },
							)}
						>
							{profile.peran}
						</span>
					</DropdownMenuLabel>
				</DropdownMenuGroup>{" "}
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="group hover:bg-space-3">
						<Link href={"/account/profile"} className="flex items-center gap-2">
							<SettingIcon className="group-hover:animate-spin-3 fill-space-4 group-hover:fill-space-1" />
							<span className="group-hover:text-space-1">Edit Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="group hover:bg-space-3">
						<Link
							href={"/account/bookmarks"}
							className="flex items-center gap-2"
						>
							<BookmarkIcon className="group-hover:animate-shake fill-space-4 group-hover:fill-space-1" />
							<span className="group-hover:text-space-1">My Bookmarks</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="group hover:bg-space-3">
						<Link
							href={"/account/bookmarks"}
							className="flex items-center gap-2"
						>
							<NotificationFillIcon className="group-hover:animate-wiggle fill-space-4 group-hover:fill-space-1" />
							<span className="group-hover:text-space-1">Notifications</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							LogOut();
						}}
						className="hover:text-red-500 hover:bg-space-1"
					>
						<LogoutIcon />
						<span>Log Out</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
