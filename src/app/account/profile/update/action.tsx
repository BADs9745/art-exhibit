"use server";
import { PrismaClient } from "@prisma/client";
import { IsLogin } from "../../action";
import { redirect, RedirectType } from "next/navigation";
export const UpdateProfile = async (label: string, data: string) => {
	const login_token = (await IsLogin()) ?? "";

	const prisma = new PrismaClient();
	if (label === "Nama") {
		await prisma.pengguna.update({
			data: {
				nama: data,
			},
			where: {
				login_token: login_token,
			},
		});
	}
	if (label === "No Telepon") {
		await prisma.pengguna.update({
			data: {
				no_telepon: data === "" ? null : BigInt(data),
			},
			where: {
				login_token: login_token,
			},
		});
	}
	prisma.$disconnect();
};
export async function Redirect(url: string) {
	redirect(url, RedirectType.replace);
}
