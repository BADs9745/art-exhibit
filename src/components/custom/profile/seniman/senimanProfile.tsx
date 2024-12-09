import Link from "next/link";
import { AvatarPicture } from "../../profile";
import { GetSenimanProfile } from "@/util/account/profile/seniman/action";
import { HomeIcon, MailIcon, PhoneIcon } from "lucide-react";

export default async function SenimanProfile() {
	const data = await GetSenimanProfile({ userId: "lplp" });

	return (
		<>
			{data?.status === 200 && (
				<header className="w-full flex justify-center p-10 bg-space-3/30">
					<div className="flex justify-end items-center m-10 flex-grow">
						<div className="flex-auto h-full grid bg-space-1/50 me-10 border-space-4 border-2 rounded-md p-3">
							{data?.biograph}
						</div>
						<div className="h-full flex flex-col justify-center items-center content-around">
							<div>
								<div className="text-3xl font-semibold">{data?.nama}</div>
								<div className="flex gap-1 flex-col mt-1">
									<span className="flex gap-1">
										<MailIcon />
										{data?.email}
									</span>
									<span className="flex gap-1">
										<PhoneIcon />
										{data?.no_telepon?.toString()}
									</span>
									<span className="flex gap-1">
										<HomeIcon />
										{data?.alamat}
									</span>
								</div>
							</div>
							<div className="flex text-xl font-semibold size-full p-3">
								<div className="grid">
									<h1 className="grid items-center">Posted Arts</h1>
									<span className="text-center grid align-top text-5xl">
										{data?.ProfilSeniman?._count.KaryaSeni}
									</span>
								</div>
							</div>
						</div>
					</div>
					<Link
						href={"/account/profile/update/profilepicture"}
						className="size-80 me-10 flex items-center justify-center bg-space-4 text-space-4 group overflow-clip rounded-full relative border-none"
					>
						<AvatarPicture className={"size-full absolute"} />
						<div className="bg-space-2 w-full text-center self-end pt-3 pb-7 font-semibold opacity-0 group-hover:opacity-100 duration-250 bottom-0 z-[2]">
							Edit Profile Picture
						</div>
					</Link>
				</header>
			)}
		</>
	);
}
