"use server";
import type { Data } from "@/app/account/signup/seniman/page";
import { $Enums, PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GetSenimanProfile() {
	const login_token = cookies().get("login_token")?.value;
	const prisma = new PrismaClient();
	const seniman = await prisma.pengguna.findUnique({
		where: { login_token: login_token ?? "" },
		select: {
			ProfilSeniman: {
				select: {
					id: true,
					KaryaSeni: {
						select: {
							id: true,
							harga: true,
							deskripsi: true,
							judul: true,
							Profil_Seniman: {
								select: { Pengguna: { select: { nama: true } } },
							},
						},
					},
				},
			},
		},
	});
	prisma.$disconnect();
	return seniman;
}

export async function SenimanVerify() {
	const login_token = cookies().get("login_token")?.value;
	const prisma = new PrismaClient();
	const userDatas = await prisma.pengguna.findUnique({
		where: { login_token: login_token },
		select: {
			nama: true,
			email: true,
			no_telepon: true,
			biograph: true,
			alamat: true,
		},
	});
	prisma.$disconnect();
	return userDatas;
}

export async function SenimanUpdate(data: Data) {
	const login_token = cookies().get("login_token")?.value;
	const prisma = new PrismaClient();
	const userId = await prisma.pengguna.findUnique({
		where: { login_token: login_token ?? "" },
		select: {
			id: true,
		},
	});
	await prisma.pengguna.update({
		where: { login_token: login_token ?? "" },
		data: {
			nama: data.nama,
			email: data.email,
			no_telepon: BigInt(data.no_telepon as string),
			biograph: data.biograph,
			alamat: data.alamat,
			peran: $Enums.Peran.SENIMAN,
			ProfilSeniman: {
				connectOrCreate: {
					create: {},
					where: {
						penggunaId: userId?.id ?? "",
					},
				},
			},
		},
	});
	prisma.$disconnect();
	redirect("/account/profile/seniman");
}
