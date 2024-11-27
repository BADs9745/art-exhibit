"use server";

import { PrismaClient } from "@prisma/client";

export async function GET() {
	const prisma = new PrismaClient();
	const file = await prisma.file.findFirstOrThrow({ orderBy: { id: "desc" } });
	const blob = new File([file.file], file.id, { type: "image/jpeg" });
	console.log(blob);
	return new Response(file.file, {
		headers: {
			"Content-Type": "image/png",
			"Content-Disposition": `attachment; filename="${file.id}"`,
		},
	});
}
