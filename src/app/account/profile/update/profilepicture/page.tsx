"use client";
import { useForm } from "react-hook-form";
import { MyButton as Button } from "@/components/custom/myButton";
import { useEffect, useState } from "react";
import { UserRoundPlus } from "lucide-react";
import { Redirect } from "@/util/account/profile/update/action";
import { useDebouncedCallback } from "use-debounce";

type Data = {
	image: Blob[] | File[];
};

export default function ProfilePicturePage() {
	const { register, handleSubmit, watch } = useForm<Data>();
	const handleChange = watch("image");
	const [Img, setImg] = useState("");

	const GetCurrentImg = useDebouncedCallback(async () => {
		const res = await fetch("/api/account/profile/picture/");
		const blob = await res.blob();
		setImg(URL.createObjectURL(blob));
	});
	const SetCurrentImg = useDebouncedCallback(async () => {
		const blob = await handleChange[0];
		if (blob) {
			setImg(URL.createObjectURL(blob));
		}
	});
	useEffect(() => {
		if (handleChange) {
			SetCurrentImg();
		} else {
			GetCurrentImg();
		}
	}, [GetCurrentImg, handleChange, SetCurrentImg]);

	const onSubmit = async (data: Data) => {
		const formData = new FormData();
		if (data.image instanceof FileList) {
			formData.append("image", data.image[0]);
		}

		const req = new Request("/api/account/profile/picture/", {
			method: "POST",
			body: formData,
		});
		if (!handleChange[0]) {
			Redirect("/account/profile");
		}
		const res = await fetch(req);
		if (res.status === 200) {
			Redirect("/account/profile");
		}
	};

	return (
		<>
			<section className="block text-center mt-10">
				<h1 className="text-5xl font-semibold">Edit Profile Picture</h1>
				<form
					className="p-10 flex items-center flex-col"
					onSubmit={handleSubmit(onSubmit)}
				>
					<label
						htmlFor="image"
						className="flex items-center justify-center rounded-full overflow-clip size-80 relative"
					>
						<input
							type="file"
							id="image"
							accept=".jpg, .jpeg, .png"
							className="bg-space-2/30 hidden"
							{...register("image")}
						/>
						<UserRoundPlus className="size-[200px] absolute self-center" />
						<div
							className="size-full bg-cover z-10 bg-center"
							style={{ backgroundImage: `url(${Img})` }}
						/>
					</label>
					<Button
						color="space2"
						className="m-10 size-96 p-3 text-lg text-space-4 font-medium"
						size="lg"
						type="submit"
					>
						Save
					</Button>
				</form>
			</section>
		</>
	);
}
