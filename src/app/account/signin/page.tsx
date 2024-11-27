"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import WarningnIcon from "@/icons/warning";
import { jockeOne } from "@/fonts/font";
import { SignIn } from "@/util/account/profile/action";
type formField = {
	email: string;
	password: string;
};
export default function ProfileSignInPage() {
	const [failed, setFailed] = useState(false);
	const { register, handleSubmit } = useForm<formField>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const Submit: SubmitHandler<formField> = async (data) => {
		const userData = (await SignIn(data)) ?? { isSuccess: false };
		if (!userData.isSuccess) {
			setFailed(true);
		}
	};

	return (
		<section className="flex flex-col justify-center items-center w-screen h-screen overflow-scroll">
			<h1
				className={`text-7xl font-semibold text-slate-200 text-center ${jockeOne.className}`}
			>
				ARTSPACE
			</h1>
			<h2
				className={`text-5xl mt-10 font-semibold text-slate-200 text-center ${jockeOne.className}`}
			>
				Login
			</h2>
			<form
				className="m-10 justify-center space-y-10 *:w-96"
				onSubmit={handleSubmit(Submit)}
			>
				<Input type="email" label="Email" {...register("email")} />
				<Input type="password" label="Password" {...register("password")} />

				{failed && (
					<Alert
						variant="destructive"
						className="text-red-500 border-red-500 space-x-3"
					>
						<WarningnIcon className="size-7 fill-red-500" />
						<AlertTitle>Login Failed</AlertTitle>
						<AlertDescription>Email or Password is incorrect</AlertDescription>
					</Alert>
				)}

				<Button className="bg-space-2 p-6 text-xl text-space-4" type="submit">
					Sign In
				</Button>
				<div className="px-3">
					<p>
						{`Don't Have Account yet, try to`}{" "}
						<Link href={"/account/signup"} className="text-blue-300">
							Sign Up
						</Link>
					</p>
					<div className="mt-5 ">
						<Link
							href={""}
							className="hover:text-red-500 duration-300 text-blue-300"
						>
							Forget Password{" "}
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
}
