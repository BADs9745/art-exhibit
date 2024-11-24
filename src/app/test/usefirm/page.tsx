"use client";
import { MyButton } from "@/components/custom/myButton";
import { Input } from "@nextui-org/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

export default function FormPage() {
	const {
		register,
		getValues,
		watch,
		setValue,
		setError,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const inpur = useDebounce(watch("input"), 300);
	useEffect(() => {
		console.log(inpur[0]);
	}, [inpur]);
	return (
		<>
			<input type="text" {...register("name")} />
			<button type="button" onClick={() => console.log(getValues("name"))}>
				Press
			</button>
			<button
				type="button"
				onClick={() => console.log(setValue("name", "Berubah"))}
			>
				Chnge
			</button>

			<form
				onSubmit={handleSubmit((form) => {
					form.preventDefault();
					console.log(form);
				})}
			>
				<Input
					type="text"
					errorMessage={() => {
						return errors.input?.message?.toString();
					}}
					{...register("input")}
					validationBehavior="native"
					isInvalid={errors.input !== undefined}
				/>
				<MyButton
					onClick={() => {
						setError("input", { message: `Error: ${inpur[0]}` });
						console.log(errors.input);
					}}
				>
					{inpur}
				</MyButton>
			</form>
		</>
	);
}
