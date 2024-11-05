"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IsEmailTaken, SignUp } from "../action";
import { useDebouncedCallback } from "use-debounce";
import { jockeOne } from "@/fonts/font";

export type Register = {
	name: string;
	email: string;
	phone?: number;
	password: string;
	confirmPassword: string;
	agreement: boolean;
};

export default function ProfileSignUpPage() {
	const [password, setPassword] = useState<string>("");
	const [isTaken, setTaken] = useState(false);
	const form = useForm<Register>({});
	const [isChecked, setIsChecked] = useState(false);
	const [termReminder, setTermReminder] = useState(false);
	async function Submit(data: Register) {
		if (!isChecked) {
			setTermReminder(true);
			return;
		}
		await SignUp(data);
	}

	const emailCallback = useDebouncedCallback(async (input) => {
		const isTaken = await IsEmailTaken(input);
		setTaken(isTaken);
	}, 500);

	return (
		<section className="flex flex-col justify-center items-center w-screen h-screen overflow-scroll">
			<h1
				className={`text-7xl m-4 text-space-4 font-semibold cursor-default ${jockeOne.className}`}
			>
				ArtSpace
			</h1>
			<h1
				className={`text-3xl m-3 font-semibold text-space-4 text-center ${jockeOne.className}`}
			>
				Register
			</h1>
			<form
				className="m-5 min-w-fit w-[30vw] justify-center rounded-3xl space-y-7"
				onSubmit={form.handleSubmit(Submit)}
			>
				<Input
					{...form.register("name", { required: true })}
					isRequired
					type="text"
					label="Name"
					validationBehavior="native"
					minLength={5}
					errorMessage={(result) => {
						if (result.validationDetails.valueMissing) {
							return "Name is Required";
						}
						if (result.validationDetails.tooShort) {
							return "Name must be at least 5 characters long";
						}
					}}
				/>
				{form.formState.errors.name && (
					<p className="text-red-500">{form.formState.errors.name.message}</p>
				)}
				<Input
					{...form.register("email", { required: true })}
					isRequired
					validationBehavior="native"
					errorMessage={(result) => {
						if (result.validationDetails.typeMismatch) {
							return "Email is Invalid";
						}
						if (result.validationDetails.valueMissing) {
							return "Email is Required";
						}
						if (result.validationDetails.customError) {
							return "Email has been used";
						}
					}}
					type="email"
					label="Email"
					validate={() => {
						if (isTaken) {
							return "Email has been used";
						}
						return true;
					}}
					onChange={(e) => {
						emailCallback(e.target.value.toLowerCase());
					}}
				/>

				<Input
					{...form.register("phone")}
					minLength={11}
					maxLength={13}
					validationBehavior="native"
					errorMessage={(phone) => {
						if (phone.validationDetails.tooShort) {
							return "Phone Number too Short at Least 11 Digits";
						}
						if (phone.validationDetails.tooLong) {
							return "Phone Number too Long at Most 13 Digits";
						}
					}}
					type="number"
					label="Phone Number"
				/>
				<Input
					{...form.register("password", { required: true })}
					type="password"
					label="Password"
					validationBehavior="native"
					minLength={8}
					errorMessage={(validate) => {
						if (validate.validationDetails.valueMissing) {
							return "Password is Required";
						}
						if (validate.validationDetails.tooShort) {
							return "Password must be at least 8 characters long";
						}
					}}
					isRequired
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<Input
					{...form.register("confirmPassword")}
					type="password"
					label="Confirm Password"
					validationBehavior="native"
					validate={(value) => {
						if (value !== password) {
							return "Password Does Not Match";
						}
						return true;
					}}
				/>
				<div>
					<Checkbox
						{...form.register("agreement", { required: true })}
						color="primary"
						radius="md"
						onValueChange={(value) => {
							setIsChecked(value);
							setTermReminder(!value);
						}}
					>
						<span className="text-space-4 font-semibold text-medium">
							Agreement Term and Service
						</span>
					</Checkbox>
					{termReminder && (
						<p className="text-red-500">
							Agreement Term and Service must be checked
						</p>
					)}
				</div>
				<div className="flex justify-end">
					<div className="w-full">
						Already Have Account try to{" "}
						<Link
							href={"/account/signin"}
							className="text-space-3 font-bold text-lg"
						>
							Sign In
						</Link>
					</div>
					<Button
						className="bg-space-4 text-xl font-bold text-space-1"
						size="lg"
						type="submit"
					>
						Sign Up
					</Button>
				</div>
			</form>
		</section>
	);
}
