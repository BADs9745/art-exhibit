"use server";

import { PrismaClient } from "@prisma/client";
import { createHash, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import type { Register } from "@/app/account/signup/page";
import { redirect } from "next/navigation";
export async function SignUp(data: Register) {
	const prisma = new PrismaClient();

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
}
export async function IsEmailTaken(emailchk: string): Promise<boolean> {
	const prisma = new PrismaClient();

	const condition =
		(await prisma.pengguna.findFirst({ where: { email: emailchk } })) !== null;
	prisma.$disconnect();
	return condition;
}

export async function SignIn({
	email,
	password,
}: { email: string; password: string }) {
	const prisma = new PrismaClient();

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
	await cookies().set("login_token", token.login_token ?? "", {
		path: "/",
		sameSite: "strict",
		secure: true,
	});
	redirect("/");
	return true;
}

export async function LogOut() {
	cookies().delete("login_token");
	redirect("/");
}

export async function IsLogin() {
	const prisma = new PrismaClient();
	try {
		const isExist = await prisma.pengguna.findUnique({
			where: {
				login_token: cookies().get("login_token")?.value ?? "",
			},
			select: { login_token: true },
		});
		if (isExist === null) {
			cookies().delete("login_token");
			return;
		}
		return isExist?.login_token;
	} catch (error) {
		if (error) {
			cookies().delete("login_token");
			redirect("/");
		}
	}
}

export async function UserProfile() {
	const prisma = new PrismaClient();

	const login_token = await IsLogin();
	if (login_token) {
		const profileData = await prisma.pengguna.findUnique({
			where: { login_token: login_token ?? "" },
			select: {
				nama: true,
				email: true,
				peran: true,
			},
		});
		prisma.$disconnect();
		return profileData;
	}
	return null;
}

export async function GetProfileData() {
	const login_token = await IsLogin();
	const prisma = new PrismaClient();
	const myProfile = await prisma.pengguna.findUnique({
		where: { login_token: login_token ?? "" },
		select: {
			nama: true,
			email: true,
			peran: true,
			no_telepon: true,
			biograph: true,
			alamat: true,
		},
	});

	return myProfile;
}
