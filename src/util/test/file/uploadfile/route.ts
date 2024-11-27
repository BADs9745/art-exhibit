"use server";

import { PrismaClient } from "@prisma/client";
import sharp from "sharp";

export async function POST(req: Request) {
	const formData = await req.formData();
	const file: File = formData.get("file") as File;
	const fileArrayBuffer = await file.arrayBuffer();
	const fileBuffer = Buffer.from(fileArrayBuffer);
	const compressImg = await sharp(fileBuffer)
		.jpeg({ quality: 90 })
		.resize(300, 300)
		.toBuffer();
	const prisma = new PrismaClient();

	await prisma.file.create({ data: { file: compressImg } });

	return Response.json({ message: "File uploaded successfully" });
}
