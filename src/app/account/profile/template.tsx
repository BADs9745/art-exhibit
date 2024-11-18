"use client";

import { useEffect, useState } from "react";
import { GetProfileData } from "../action";
import ProfileSideBard from "./components/sidebar";
import { $Enums } from "@prisma/client";

type DataPengguna = {
	nama: string;
	email: string;
	peran: $Enums.Peran;
	no_telepon: bigint | null;
	foto_profil: string | null;
};
export default function ProfileTemplate() {
	const [tabIndex, setTabIndex] = useState(0);
	const [profileData, setProfileData] = useState<DataPengguna>();

	useEffect(() => {
		const Profile = async () => {
			const data = await GetProfileData();
			console.log(data);
			setProfileData(
				data ?? {
					nama: "",
					email: "",
					peran: $Enums.Peran.PELANGGAN,
					no_telepon: null,
					foto_profil: null,
				},
			);
		};
	}, []);

	return (
		<section className="flex w-screen">
			<ProfileSideBard className="py-10 px-28 min-h-screen bg-blue-500" />
			<div className="w-full bg-red-500">
				<h1>My Profile</h1>
				{}
			</div>
		</section>
	);
}
