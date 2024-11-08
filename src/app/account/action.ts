"use server";

import { PrismaClient } from "@prisma/client";
import type { Register } from "./signup/page";
import { createHash, randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const SignUp = async (data: Register) => {
	const hashPassword = createHash("sha256")
		.update(data.password)
		.digest("base64");
	const phone = data.phone || null;
	let success = false;

	try {
		if (data.agreement) {
			await prisma.pengguna.create({
				data: {
					nama: data.name,
					email: data.email.toLowerCase(),
					kata_sandi: hashPassword,
					no_telepon: phone,
				},
			});
			success = true;
		} else {
			success = false;
			throw new Error("Please accept the terms and conditions");
		}
	} catch (error) {
		console.log(error);
		const err = error as { message: { target: string } };
		console.log(err);
		prisma.$disconnect();
		success = false;
	}
	if (success) {
		redirect("/account/signin");
	}
	return success;
};
export async function IsEmailTaken(email: string): Promise<boolean> {
	return (await prisma.pengguna.findUnique({ where: { email } })) !== null;
}

export async function SignIn({
	email,
	password,
}: { email: string; password: string }): Promise<{
	isSuccess: boolean;
}> {
	const hashPassword = createHash("sha256").update(password).digest("base64");
	const res = await prisma.pengguna.findFirst({
		where: {
			email: email.toLowerCase(),
			kata_sandi: hashPassword,
		},
		select: {
			id: true,
		},
	});
	if (!res) {
		return {
			isSuccess: false,
		};
	}
	prisma.$disconnect();
	const loginToken = randomUUID();
	const token = await prisma.pengguna.update({
		where: {
			email: email,
		},
		data: {
			login_token: createHash("sha256").update(loginToken).digest("base64"),
		},
		select: {
			login_token: true,
		},
	});
	prisma.$disconnect();
	await cookies().set("login_token", token.login_token ?? "", { path: "/" });
	redirect("/dashboard/");
	return { isSuccess: true };
}

export async function LogOut() {
	cookies().delete("login_token");
	redirect("/");
}

export async function IsLogin() {
	return cookies().get("login_token")?.value;
}

export const ToMyProfile = () => {
	redirect("/account/profile");
};

export const UserProfile = async (login_token: string) => {
	const profileData = await prisma.pengguna.findUnique({
		where: { login_token: login_token },
		select: {
			nama: true,
			email: true,
			peran: true,
		},
	});
	return profileData;
};
