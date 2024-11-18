"use client";

import { useEffect, useState } from "react";
import { GetProfileData } from "../action";
import { $Enums } from "@prisma/client";
import { jockeOne } from "@/fonts/font";
import { MyButton as Button } from "@/components/custom/myButton";
import { Input } from "@nextui-org/input";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

type DataPengguna = {
	nama: string;
	email: string;
	peran: $Enums.Peran;
	no_telepon: bigint | null;
};
const dataObject = {
	nama: "",
	email: "",
	peran: $Enums.Peran.PELANGGAN,
	no_telepon: null,
	foto_profil: null,
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
		color: "#BBE1FA",
		backgroundColor: "rgb(15 76 117 / 0.1 )",
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

export default function MyProfilePage() {
	const [profileData, setProfileData] = useState<DataPengguna>({
		nama: "",
		email: "",
		no_telepon: null,
		peran: $Enums.Peran.PELANGGAN,
	});

	useEffect(() => {
		const Profile = async () => {
			const data = await GetProfileData();
			console.log(data);
			setProfileData(data ?? dataObject);
			console.log(data);
		};
		Profile();
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
						{FieldData("Nama", profileData.nama)}
						{FieldData("Email", profileData.email)}
						{FieldData("No Telepon", profileData.no_telepon ?? "")}
					</motion.div>
					<motion.div initial={{ x: 500 }} variants={profilePicture}>
						<Link
							href={"#"}
							className="size-80 me-10 flex items-center justify-center rounded-full bg-red-500"
						>
							Profile
						</Link>
					</motion.div>
				</motion.div>
			</main>
			{/* <div>
				<h1 className="text-3xl font-bold p-10 bg-space-2 max-w-[700px] rounded">
					Update Profile
				</h1>
			</div> */}
		</section>
	);
}
function FieldData(label: string, fieldData: string | bigint) {
	return (
		<motion.div
			key={"profile-data-field"}
			initial={{ opacity: 0, width: 0 }}
			variants={profileParent}
			className="p-5 flex items-center bg-space-2 rounded-xl"
		>
			<div className="gap-3 w-full flex flex-col">
				<div>{label}</div>
				<div className="w-full flex-1 font-semibold text-xl">
					{fieldData.toString()}
				</div>
			</div>
			<Button color="space3" radius="sm">
				Change
			</Button>
		</motion.div>
	);
}
