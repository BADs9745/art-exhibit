"use client";

import { useForm } from "react-hook-form";

export default function ProfileUploadPage() {
	const form = useForm<Data>();

	return (
		<>
			<form>
				<input type="file" {...form.register("file")} />
				<button type="button" onClick={form.handleSubmit(Submit)}>
					Submit
				</button>
			</form>
		</>
	);
}
type Data = {
	file: FileList;
};
const Submit = async (data: Data) => {
	const formData = new FormData();
	formData.append("file", data.file[0]);
	await fetch("./profil/upload", {
		method: "POST",
		body: formData,
	});
	console.log(data.file[0]);
};
