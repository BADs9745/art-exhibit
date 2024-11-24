"use client";

import { useEffect, useState } from "react";
import { GetProfileData } from "../action";
import { $Enums } from "@prisma/client";
import { jockeOne } from "@/fonts/font";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { UpdateDialog } from "./components/updateDialog";
import Image from "next/image";
import PersonIcon from "@/icons/person";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MyButton } from "@/components/custom/myButton";
import { EditIcon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";

type DataPengguna = {
	nama: string;
	email: string;
	peran: $Enums.Peran;
	no_telepon?: bigint | null;
	biodata?: string | null;
};
const dataObject = {
	nama: "",
	email: "",
	peran: $Enums.Peran.PELANGGAN,
	no_telepon: null,
};
const profileCard: Variants = {
	init: {
		transition: { when: "beforeChildren", staggerChildren: 0.2 },
	},
};
const profileParent: Variants = {
	init: {
		opacity: 1,
		width: 700,
		backgroundColor: "rgb(15 76 117 / 0)",
		transition: {
			duration: 1,
			type: "spring",
			bounce: 0.5,
			stiffness: 50,
		},
	},
};

const profilePicture: Variants = {
	init: {
		x: 0,
		transition: {
			delay: 0.5,
			duration: 1.5,
			type: "spring",
			bounce: 0.5,
			stiffness: 50,
		},
	},
};

type bioGraphState = {
	input: boolean;
	button: "Edit" | "Save";
};

export default function MyProfilePage() {
	const [profileData, setProfileData] = useState<DataPengguna>({
		nama: "",
		email: "",
		no_telepon: null,
		peran: $Enums.Peran.PELANGGAN,
	});
	const [profilePic, setProfilePic] = useState<string>("");
	const [bioGraphState, setBioGraphState] = useState<bioGraphState>({
		input: false,
		button: "Edit",
	});
	const { register } = useForm<DataPengguna>();

	useEffect(() => {
		const Profile = async () => {
			const data = await GetProfileData();
			setProfileData(data ?? dataObject);
		};
		Profile();

		const getProfilePic = async () => {
			const data = await fetch("/account/profile/api/get/picture", {
				method: "GET",
				cache: "no-cache",
			});
			const blob = await data.blob();
			const url = URL.createObjectURL(blob);
			setProfilePic(url);
		};

		getProfilePic();
	}, []);
	return (
		<section className="px-20 overflow-hidden">
			<header className="py-10 bg-space-1">
				<h1
					className={`text-3xl font-semibold text-space-4 ${jockeOne.className}`}
				>
					MY PROFILE
				</h1>
				<h2>General Setting your profile Data</h2>
			</header>
			<main>
				<motion.div animate={"init"} className="flex w-full">
					<motion.div
						className="flex flex-col space-y-7 flex-1"
						variants={profileCard}
					>
						{FieldData("Email", profileData.email)}
						{FieldData("Nama", profileData.nama)}
						{FieldData(
							"No Telepon",
							profileData.no_telepon ?? "Belum ada data",
						)}
					</motion.div>
					<motion.div initial={{ x: 500 }} variants={profilePicture}>
						<Link
							href={"./profile/update/profilepicture"}
							className="size-80 me-10 flex items-center justify-center bg-space-4 text-space-4 group overflow-clip rounded-full relative border-2 border-space-1"
						>
							<Image
								src={profilePic}
								width={320}
								height={320}
								aria-hidden
								alt=""
								className="absolute text-3xl size-80 flex items-center justify-center z-[1]"
							/>
							<PersonIcon className="absolute size-52 fill-space-1/70" />
							<div className="bg-space-2 w-full text-center self-end pt-3 pb-7 font-semibold opacity-0 group-hover:opacity-100 duration-250 bottom-0 z-[2]">
								Edit Profile Picture
							</div>
						</Link>
					</motion.div>
				</motion.div>
				<div className="">
					<Label htmlFor="bio-data">Bio Data</Label>
					<Textarea
						className={"bg-space-2/30 border-space-4/10 h-56 "}
						id="bio-data"
						disabled={bioGraphState.input}
						{...register("biodata")}
					/>
					<div className="flex mt-5 gap-5">
						<MyButton
							color="space2"
							className="font-semibold text-base px-10"
							onClick={() => {
								setBioGraphState((value) => ({
									input: !value.input,
									button: value.input ? "Save" : "Edit",
								}));
							}}
						>
							{bioGraphState.button}{" "}
							{bioGraphState.input ? <EditIcon /> : <SaveIcon />}
						</MyButton>
					</div>
				</div>
			</main>
		</section>
	);
}
const FieldData = (label: string, fieldData: string | bigint) => {
	return (
		<motion.div
			initial={{ opacity: 0, width: 0 }}
			variants={profileParent}
			className="p-1 flex items-center bg-space-2 rounded-xl overflow-clip"
		>
			<div className="gap-3 w-full flex flex-col">
				<div>{label}</div>
				<motion.div
					key={fieldData.toString()}
					className={clsx(
						"w-full flex-1 font-semibold text-xl text-clip overflow-clip text-nowrap",
						{ "text-red-500": fieldData === "Belum ada data" },
					)}
					initial={{
						width: "0%",
					}}
					animate={{
						width: "100%",
					}}
				>
					{fieldData.toString()}
				</motion.div>
			</div>
			{label !== "Email" && (
				<UpdateDialog
					className="bg-space-1"
					label={label}
					val={fieldData.toString()}
				/>
			)}
		</motion.div>
	);
};
