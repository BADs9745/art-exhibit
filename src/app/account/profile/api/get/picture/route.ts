"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export async function GET() {
	const prisma = new PrismaClient();
	const token = cookies().get("login_token")?.value;
	const bufferPic = await prisma.pengguna.findUniqueOrThrow({
		where: { login_token: token },
		select: { foto_profil: true },
	});

	return new Response(bufferPic.foto_profil, {
		headers: { "Content-Type": "image/webp" },
	});
}
