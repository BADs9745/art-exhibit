"use client";
import { useForm } from "react-hook-form";
type data = {
	name: string;
	file: FileList;
};
export default function UploadFilePage() {
	const { register, handleSubmit } = useForm<data>({});

	const onSubmit = async (data: data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("file", data.file[0]);

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
				<button type="submit">Upload</button>
			</form>
		</>
	);
}
