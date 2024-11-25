"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export async function GET(req: Request) {
	const prisma = new PrismaClient();
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");
	const token = userId ? undefined : cookies().get("login_token")?.value;
	const bufferPic = await prisma.pengguna.findFirstOrThrow({
		where: {
			OR: [{ login_token: token }, { id: userId ?? undefined }],
		},
		select: { foto_profil: true },
	});
	prisma.$disconnect();
	return new Response(bufferPic.foto_profil, {
		headers: { "Content-Type": "image/webp" },
	});
}
