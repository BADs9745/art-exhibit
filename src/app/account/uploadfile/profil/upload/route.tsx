"use server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
	const prisma = new PrismaClient();
	const data = await req.formData();
	const file = data.get("file") as File;
	const buffer = Buffer.from(await file.arrayBuffer());

	await prisma.file.create({
		data: {
			file: buffer,
		},
	});

	return Response.json({ message: "Hello, World!" });
}
