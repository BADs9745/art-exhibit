"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import sharp from "sharp";
import fs from "node:fs";

export async function GET(req: Request) {
	const prisma = new PrismaClient();
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");
	const token = userId ? undefined : cookies().get("login_token")?.value;
	try {
		const bufferPic = await prisma.pengguna.findFirstOrThrow({
			where: {
				OR: [{ login_token: token }, { id: userId ?? undefined }],
			},
			select: { foto_profil: true },
		});
		prisma.$disconnect();
		if (bufferPic.foto_profil === null) {
			const defaultPicture = fs.readFileSync(
				"src/public/assets/img/default-profile-picture.jpg",
			);
			return new Response(defaultPicture, {
				headers: { "Content-Type": "image/webp" },
			});
		}
		return new Response(bufferPic.foto_profil, {
			headers: { "Content-Type": "image/webp" },
		});
	} catch (error) {
		if (error) {
			const defaultPicture = fs.readFileSync(
				"src/public/assets/img/default-profile-picture.jpg",
			);
			return new Response(defaultPicture, {
				headers: { "Content-Type": "image/webp" },
			});
		}
	}
}

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
