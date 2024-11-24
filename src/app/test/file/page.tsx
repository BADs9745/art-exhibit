"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function GetFilePage() {
	useEffect(() => {
		const GetFile = async () => {
			const file = await fetch("./file/getfile");
			const blob = await file.blob();
			const url = URL.createObjectURL(blob);
			setUrl(url);
		};
		GetFile();
	}, []);
	const [imgUrl, setUrl] = useState("");
	const { register, handleSubmit, getValues } = useForm<Data>();

	const Submit = async (data: Data) => {
		console.log(data);
		const form = new FormData();
		form.append("file", data.file[0]);
		fetch("/test/file/uploadfile", { method: "POST", body: form });
	};

	return (
		<>
			<form onSubmit={handleSubmit(Submit)}>
				<label htmlFor="file">
					ekfjlejlkf
					<input
						type="file"
						id="file"
						accept="images/jpeg"
						{...register("file")}
						onChange={() => {
							console.log(getValues("file"));
						}}
					/>
				</label>
				<button type="submit" className="p-10 bg-red-500">
					Upload File
				</button>
			</form>

			<img src={imgUrl} alt="idk" className="rounded-full" />
		</>
	);
}

type Data = {
	file: FileList;
};
