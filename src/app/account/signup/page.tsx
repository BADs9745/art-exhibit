"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { jockeOne, kreon } from "@/fonts/font";
import { IsEmailTaken, SignUp } from "@/util/account/profile/action";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export type Register = {
	name: string;
	email: string;
	phone?: number;
	password: string;
	confirmPassword: string;
	agreement: boolean;
};

export default function ProfileSignUpPage() {
	const [termReminder, setTermReminder] = useState(false);
	const { register, handleSubmit, getValues } = useForm<Register>({});
	const [isTaken, setTaken] = useState(false);
	const [passVisible, setPassVisible] = useState(false);

	async function Submit(data: Register) {
		if (await IsEmailTaken(data.email)) {
			setTaken(true);
		} else {
			setTaken(false);
		}
		if (!isTaken) {
			await SignUp(data);
		}
	}

	return (
		<section className="flex flex-col justify-center items-center w-screen h-screen overflow-scroll">
			<h1
				className={`text-7xl m-4 text-space-4 font-semibold cursor-default ${jockeOne.className}`}
			>
				ARTSPACE
			</h1>
			<h1
				className={`text-3xl m-3 font-semibold text-space-4 text-center ${kreon.className}`}
			>
				Register
			</h1>
			<form
				className="m-5 min-w-fit w-[30vw] justify-center rounded-3xl space-y-7"
				onSubmit={handleSubmit(Submit, () => {
					setTermReminder(true);
				})}
			>
				<Input
					{...register("name", { required: true })}
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
				<Input
					{...register("email", { required: true })}
					isRequired
					validationBehavior="native"
					errorMessage={(email) => {
						if (email.validationDetails.valueMissing) {
							return "Email is Required";
						}
						if (email.validationDetails.typeMismatch) {
							return "Invalid Email";
						}
						if (email.validationDetails.customError) {
							return "This Email address already been used";
						}
					}}
					isInvalid={isTaken}
					type="email"
					label="Email"
				/>

				<Input
					{...register("phone")}
					minLength={11}
					validationBehavior="native"
					errorMessage={(phone) => {
						if (phone.validationDetails.tooShort) {
							return "Phone Number too Short at Least 11 Digits";
						}
					}}
					type="number"
					label="Phone Number"
				/>
				<Input
					{...register("password", { required: true })}
					type={passVisible ? "text" : "password"}
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
					endContent={
						<button
							type="button"
							className="text-space-1"
							onClick={() => {
								setPassVisible(!passVisible);
							}}
						>
							{!passVisible ? <EyeIcon /> : <EyeOffIcon />}
						</button>
					}
				/>
				<Input
					{...register("confirmPassword")}
					type={passVisible ? "text" : "password"}
					label="Confirm Password"
					validationBehavior="native"
					validate={(value) => {
						if (value !== getValues("password")) {
							return "Password Does Not Match";
						}
						return true;
					}}
					errorMessage={(validate) => {
						return validate.validationErrors;
					}}
					endContent={
						<button
							type="button"
							className="text-space-1"
							onClick={() => {
								setPassVisible(!passVisible);
							}}
						>
							{!passVisible ? <EyeIcon /> : <EyeOffIcon />}
						</button>
					}
				/>
				<div>
					<Checkbox
						{...register("agreement", { required: true })}
						color="primary"
						radius="md"
						onValueChange={(value) => {
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
							className="text-space-3 hover:text-space-4 duration-300 font-semibold text-lg"
						>
							Sign In
						</Link>
					</div>
					<Button
						className="bg-space-2 font-semibold text-space-4"
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
