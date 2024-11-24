"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import sharp from "sharp";

export async function POST(req: Request) {
	const data = await req.formData();
	const file = data.get("image") as File;

	const buffer = Buffer.from(await file.arrayBuffer());

	const compressImg = await sharp(buffer)
		.jpeg({ quality: 80 })
		.resize(500, 500)
		.toBuffer();

	const prisma = new PrismaClient();
	const token = cookies().get("login_token")?.value;
	let res = {
		message: "Profile picture updated successfully",
		status: 200,
	};
	if (token)
		try {
			await prisma.pengguna.update({
				where: {
					login_token: token,
				},
				data: {
					foto_profil: compressImg,
				},
			});
		} catch (error) {
			const err = error as PrismaError;
			console.log(err.meta);
			res = {
				message: err.meta.cause,
				status: 500,
			};
		}
	return Response.json(res);
}

type PrismaError = {
	meta: {
		modelName: string;
		cause: string;
	};
};
