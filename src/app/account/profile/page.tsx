"use client";

import { useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { kreon } from "@/fonts/font";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MyButton } from "@/components/custom/myButton";
import { EditIcon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { UpdateProfile } from "@/util/account/profile/update/action";
import { GetProfileData } from "@/util/account/profile/action";
import { useDebouncedCallback } from "use-debounce";
type DataPengguna = {
	nama?: string | null;
	email?: string | null;
	peran?: $Enums.Peran | null;
	no_telepon?: bigint | null;
	biograph?: string | null;
	alamat?: string | null;
};
const dataObject = {
	nama: "",
	email: "",
	peran: $Enums.Peran.PELANGGAN,
	no_telepon: null,
	biodata: "",
};

export default function MyProfilePage() {
	const [profileData, setProfileData] = useState<DataPengguna>({
		nama: null,
		email: null,
		no_telepon: null,
		peran: null,
		biograph: null,
		alamat: null,
	});
	const [bioGraphState, setBioGraphState] = useState({
		disabled: true,
		loading: false,
	});
	const UpdateDebounce = useDebouncedCallback((label: string, data: string) => {
		UpdateProfile(label, data);
		setBioGraphState({ disabled: true, loading: false });
	}, 1000);
	const { register, getValues } = useForm<DataPengguna>();

	const GetDataDebounce = useDebouncedCallback(async () => {
		const data = await GetProfileData();
		setProfileData(data ?? dataObject);
	}, 50);

	useEffect(() => {
		GetDataDebounce();
	}, [GetDataDebounce]);
	return (
		<section className="px-40 overflow-hidden">
			<motion.header
				className="py-10 bg-space-1 overflow-clip text-nowrap"
				initial={{
					width: 0,
					opacity: 0,
				}}
				animate={{
					width: "fit-content",
					opacity: 1,
				}}
			>
				<h1
					className={`text-3xl font-semibold text-space-4 ${kreon.className}`}
				>
					MY PROFILE
				</h1>
				<h2>General Setting your profile Data</h2>
			</motion.header>
			<main>
				<div className="flex w-full">
					<div className="flex flex-col space-y-7 flex-1">
						<FieldData
							label="Email"
							fieldData={`${profileData.email ?? "Loading..."}  ( ${profileData.peran ?? "Loading..."} )`}
						/>
						<FieldData
							label="Nama"
							fieldData={profileData.nama ?? "Loading..."}
						/>
						<FieldData
							label="No Telepon"
							fieldData={profileData.no_telepon ?? "Loading..."}
						/>
						<FieldData
							label="Alamat"
							fieldData={profileData.alamat ?? "Loading..."}
						/>
					</div>
					<div>
						<Link
							href={"./profile/update/profilepicture"}
							className="size-80 me-10 flex items-center justify-center bg-space-4 text-space-4 group overflow-clip rounded-full relative border-2 border-space-1"
						>
							<Image
								src={"/api/account/profile/picture"}
								width={320}
								height={320}
								aria-hidden
								alt=""
								className="absolute text-3xl size-80 flex items-center justify-center z-[1]"
							/>

							<div className="bg-space-2 w-full text-center self-end pt-3 pb-7 font-semibold opacity-0 group-hover:opacity-100 duration-250 bottom-0 z-[2]">
								Edit Profile Picture
							</div>
						</Link>
					</div>
				</div>
				<div className="my-10">
					<Label htmlFor="bio-graph">Bio Data</Label>
					<Textarea
						className={
							"bg-space-2/30 border-space-4/10 h-56 disabled:bg-space-2/10"
						}
						key={profileData.biograph?.toString()}
						id="bio-graph"
						disabled={bioGraphState.disabled}
						defaultValue={profileData.biograph?.toString() ?? "Loading..."}
						{...register("biograph", { required: false })}
					/>
					<div className="flex mt-5 gap-5">
						<MyButton
							color="space2"
							className="font-semibold"
							onClick={() => {
								if (!bioGraphState.disabled) {
									setBioGraphState({ disabled: true, loading: true });
									UpdateDebounce(
										"BioGraph",
										getValues("biograph")?.toString() ?? "",
									);
								} else {
									setBioGraphState({ disabled: false, loading: false });
								}
							}}
						>
							{!bioGraphState.loading ? (
								bioGraphState.disabled ? (
									<>
										Edit Bio
										<EditIcon />
									</>
								) : (
									<>
										Save Bio
										<SaveIcon />
									</>
								)
							) : (
								<span className="h-full flex items-center text-transparent justify-center bg-gradient-to-r from-space-1 to-space-4 bg-clip-text animate-[btn-loading_3s_linear_infinite]">
									Updating ...
								</span>
							)}
						</MyButton>
					</div>
				</div>
			</main>
		</section>
	);
}
const FieldData = ({
	label,
	fieldData,
}: { label: string; fieldData: string | bigint | null }) => {
	const { register, getValues } = useForm();
	const [btnState, setBtnState] = useState({
		disabled: true,
		loading: false,
	});
	const UpdateDebounce = useDebouncedCallback((label: string, data: string) => {
		UpdateProfile(label, data);
		setBtnState({ disabled: true, loading: false });
	}, 3000);
	return (
		<div className="p-1 flex items-center me-32 rounded-xl overflow-clip gap-5">
			<div className="gap-3 w-full flex flex-col">
				<div>{label}</div>
				<div
					key={fieldData?.toString()}
					className={clsx(
						"w-full flex-1 font-semibold text-xl text-clip overflow-clip text-nowrap",
						{ "text-red-500": fieldData === "Belum ada data" },
					)}
				>
					{label === "Email" || label === "Jenis Akun" ? (
						fieldData?.toString()
					) : (
						<Input
							className="disabled:bg-space-2/10 bg-space-2 duration-300"
							defaultValue={fieldData?.toString()}
							disabled={btnState.disabled}
							type={label === "No Telepon" ? "number" : "text"}
							{...register(label)}
						/>
					)}
				</div>
			</div>
			{label !== "Email" && (
				<MyButton
					color="space2"
					className="font-semibold self-end overflow-clip"
					onClick={() => {
						if (!btnState.disabled) {
							setBtnState({ disabled: true, loading: true });
							UpdateDebounce(label, getValues(label));
						} else {
							setBtnState({ disabled: false, loading: false });
						}
					}}
				>
					{!btnState.loading ? (
						!btnState.disabled ? (
							<>
								Save <SaveIcon />
							</>
						) : (
							<>
								Edit <EditIcon />
							</>
						)
					) : (
						<span className="h-full flex items-center text-transparent justify-center bg-gradient-to-r from-space-1 to-space-4 bg-clip-text animate-[btn-loading_3s_linear_infinite]">
							Updating ...
						</span>
					)}
				</MyButton>
			)}
		</div>
	);
};
