"use server";
import fs from "node:fs";
import path from "node:path";

export async function POST(request: Request) {
	const UPLOAD_DIR = path.join(process.cwd(), "src", "public", "img");
	if (!fs.existsSync(UPLOAD_DIR)) {
		fs.mkdirSync(UPLOAD_DIR);
	}
	const data = await request.formData();
	const file = data.get("file") as File;
	const fileName = data.get("name") as string;
	const files = data.getAll("files") as File[];
	const fileBuffer = await file.arrayBuffer();
	const imgBuffer = Buffer.from(fileBuffer);
	console.log(UPLOAD_DIR);
	fs.writeFile(`${UPLOAD_DIR}/${fileName}.jpg`, imgBuffer, (err) => {
		if (err) throw err;
		console.log("Saved!");
	});

	for (const img of files) {
		const buffer = Buffer.from(await img.arrayBuffer());
		fs.writeFile(`${UPLOAD_DIR}/${img.name}.jpg`, buffer, (err) => {
			if (err) throw err;
			console.log("Saved!");
		});
	}
	return Response.json({ message: "Hello, World!" });
}
