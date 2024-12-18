"use client";
import { useForm } from "react-hook-form";
import { MyButton as Button } from "@/components/custom/myButton";
import { useRef } from "react";
import { UserRoundPlus } from "lucide-react";
import { Redirect } from "@/util/account/profile/update/action";

type Data = {
	[key: string]: FileList | string;
	image: FileList;
};

export default function ProfilePicturePage() {
	const { register, handleSubmit, watch } = useForm<Data>();
	const preview = useRef<HTMLDivElement>(null);

	const handleChange = watch("image");

	if (preview.current) {
		preview.current.style.backgroundImage = `url(${URL.createObjectURL(handleChange[0])})`;
	}

	const onSubmit = async (data: Data) => {
		const formData = new FormData();
		if (data.image instanceof FileList) {
			formData.append("image", data.image[0]);
		}

		const req = new Request("/api/account/profile/picture/", {
			method: "POST",
			body: formData,
		});

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
					<label htmlFor="image" className="flex items-center justify-center">
						<input
							type="file"
							id="image"
							accept=".jpg, .jpeg, .png"
							className="bg-space-2/30 hidden"
							{...register("image")}
						/>
						<UserRoundPlus className="size-[200px] absolute self-center" />
						<div
							className="size-[500px] bg-space-2/10 rounded-full bg-cover bg-center z-10"
							ref={preview}
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
