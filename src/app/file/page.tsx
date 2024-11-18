"use client";
import { useEffect, useState } from "react";

export default function GetFilePage() {
	useEffect(() => {
		const GetFile = async () => {
			const file = await fetch("./file/getfile");
			const blob = await file.blob();
			const url = URL.createObjectURL(blob);
			setUrl(url);
			console.log(url);
		};
		GetFile();
	}, []);
	const [imgUrl, setUrl] = useState("");
	return (
		<>
			<img src={imgUrl} alt="" />
		</>
	);
}
