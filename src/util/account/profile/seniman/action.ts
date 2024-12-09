"use server";
import type { Data } from "@/app/account/signup/seniman/page";
import { $Enums, PrismaClient } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type senimanProfile = {
	nama: string;
	ProfilSeniman: {
		_count: {
			KaryaSeni: number;
		};
		KaryaSeni: {
			id: string;
			judul: string;
			deskripsi: string;
			harga: Decimal | null;
		}[];
		id: string;
	} | null;
	email: string;
	biograph: string | null;
	alamat: string | null;
	no_telepon: bigint | null;
} | null;

export async function GetSenimanProfile({ userId }: { userId?: string }) {
	const login_token = cookies().get("login_token")?.value;
	const prisma = new PrismaClient();
	try {
		if (userId) {
			const seniman = await prisma.pengguna.findUniqueOrThrow({
				where: { id: userId ?? "" },
				select: {
					ProfilSeniman: {
						select: {
							id: true,
							_count: {
								select: {
									KaryaSeni: true,
								},
							},
							KaryaSeni: {
								select: {
									id: true,
									harga: true,
									deskripsi: true,
									judul: true,
								},
							},
						},
					},
					nama: true,
					email: true,
					alamat: true,
					biograph: true,
					no_telepon: true,
				},
			});
			prisma.$disconnect();
			return { ...seniman, status: 200, error: null };
		}
		const seniman = await prisma.pengguna.findUnique({
			where: { login_token: login_token ?? "" },
			select: {
				ProfilSeniman: {
					select: {
						id: true,
						_count: {
							select: {
								KaryaSeni: true,
							},
						},
						KaryaSeni: {
							select: {
								id: true,
								harga: true,
								deskripsi: true,
								judul: true,
							},
						},
					},
				},
				nama: true,
				email: true,
				alamat: true,
				biograph: true,
				no_telepon: true,
			},
		});
		prisma.$disconnect();
		return { ...seniman, status: 200, error: null };
	} catch (error) {
		prisma.$disconnect();
		console.log(`${error}`);
	}
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
