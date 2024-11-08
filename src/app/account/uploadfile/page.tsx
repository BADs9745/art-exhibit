"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
type data = {
	[key: string]: string | FileList;
	name: string;
	file: FileList;
	files: FileList;
};
export default function UploadFilePage() {
	const { register, handleSubmit } = useForm<data>({});

	const onSubmit = async (data: data) => {
		const formData = new FormData();

		for (const key in data) {
			if (data[key] instanceof FileList) {
				const files = Array.from(data[key]);
				for (const img of files) {
					formData.append(key, img);
				}
			} else {
				formData.append(key, data[key]);
			}
		}

		console.log(formData);

		try {
			await fetch("./uploadfile/upload", {
				method: "POST",
				body: formData,
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Nama File"
					className="text-black"
					{...register("name")}
				/>
				<input type="file" {...register("file")} />
				<Input type="file" multiple {...register("files")} />
				<button type="submit">Upload</button>
			</form>
		</>
	);
}
