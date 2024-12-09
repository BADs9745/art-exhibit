import SenimanProfile from "@/components/custom/profile/seniman/senimanProfile";
import SenimanVerify from "@/components/custom/profile/seniman/senimanVerify";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function SenimanProfilePage() {
	const prisma = new PrismaClient();

	const senimanId = await prisma.pengguna.findUnique({
		where: { login_token: cookies().get("login_token")?.value ?? "" },
		select: { ProfilSeniman: { select: { id: true } } },
	});

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				{senimanId ? <SenimanProfile /> : <SenimanVerify />}
			</Suspense>
		</>
	);
}
