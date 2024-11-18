"use client";

import { useEffect, useState } from "react";
import { GetProfileData } from "../action";
import { $Enums } from "@prisma/client";
import { jockeOne } from "@/fonts/font";
import { MyButton as Button } from "@/components/custom/myButton";
import { Input } from "@nextui-org/input";
import { motion, type Variants } from "framer-motion";

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
		transition: { when: "beforeChildren", staggerChildren: 0.1 },
	},
};
const profileParent: Variants = {
	init: {
		opacity: 1,
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
		<section className="px-20">
			<header className="py-10 bg-space-1">
				<h1
					className={`text-3xl font-semibold text-space-4 ${jockeOne.className}`}
				>
					MY PROFILE
				</h1>
				<h2>General Setting your profile Data</h2>
			</header>
			<main className="flex w-full">
				<motion.div
					className="flex flex-col space-y-7 flex-1"
					key={"profile-data-card"}
					animate={"init"}
					variants={profileCard}
				>
					{FieldData("Nama", profileData.nama)}
					{FieldData("Email", profileData.email)}
					{FieldData("No Telepon", profileData.no_telepon ?? "")}
				</motion.div>
			</main>
		</section>
	);
}
function FieldData(label: string, fieldData: string | bigint) {
	return (
		<motion.div
			key={"profile-data-field"}
			initial={{ opacity: 0 }}
			variants={profileParent}
		>
			<label htmlFor="nama">{label}</label>
			<div className="flex mt-3 gap-3 w-full max-w-[700px]">
				<div className="w-full">
					<Input
						key={fieldData.toString()}
						id="nama"
						defaultValue={fieldData.toString()}
					/>
				</div>
				<Button color="space2">Change</Button>
			</div>
		</motion.div>
	);
}
