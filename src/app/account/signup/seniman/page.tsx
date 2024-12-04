"use client";

import { MyButton } from "@/components/custom/myButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
	SenimanUpdate,
	SenimanVerify,
} from "@/util/account/profile/seniman/action";
import { ArrowBigRightDashIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

export type Data = {
	nama: string;
	email: string;
	no_telepon?: string | null;
	biograph?: string | null;
	alamat?: string | null;
};
const InputClass = "bg-space-2/70 duration-300 text-xl font-semibold p-7";
export default function SenimanInit() {
	const GetDebounce = useDebouncedCallback(async () => {
		const data = await SenimanVerify();
		setValue("nama", data?.nama ?? "");
		setValue("email", data?.email ?? "");
		setValue("no_telepon", data?.no_telepon?.toString());
		setValue("alamat", data?.alamat ?? "");
		setValue("biograph", data?.biograph ?? "");
	}, 150);
	useEffect(() => {
		GetDebounce();
	}, [GetDebounce]);
	const { register, setValue, handleSubmit } = useForm<Data>();
	const submit = async (data: Data) => {
		console.log(data);
		SenimanUpdate(data);
	};
	return (
		<>
			<header className="flex justify-center items-center w-screen p-10">
				<h1 className="text-3xl font-semibold">Maestro Registration Page</h1>
			</header>
			<section className="p-5 flex flex-col items-center">
				<h1 className="text-2xl font-medium">Set Your Artist Profile</h1>
				<div className="flex justify-center items-center flex-col">
					<h2 className="m-3 text-lg">Verify Your Information</h2>
					<form
						className="my-5 mx-40 flex flex-col space-y-5 w-full items-center"
						onSubmit={handleSubmit(submit)}
					>
						<div className="flex space-x-5 w-full">
							<label htmlFor="nama" className="space-y-5 w-full">
								<span className="text-xl font-medium">Nama</span>
								<Input className={InputClass} id="nama" {...register("nama")} />
							</label>
							<label htmlFor="email" className="space-y-5 w-full">
								<span className="text-xl font-medium">Email</span>
								<Input
									disabled
									className={cn(`${InputClass} cursor-not-allowed bg-space-2/20
									`)}
									id="email"
									{...register("email")}
								/>
							</label>
						</div>
						<div className="flex space-x-5 w-full">
							<label htmlFor="no_telepon" className="space-y-5 w-full">
								<span className="text-xl font-medium">No Telepon</span>
								<Input
									className={InputClass}
									id="no_telepon"
									type="number"
									{...register("no_telepon")}
								/>
							</label>
							<label htmlFor="alamat" className="space-y-5 w-full">
								<span className="text-xl font-medium">Alamat</span>
								<Input
									className={InputClass}
									id="alamat"
									{...register("alamat")}
								/>
							</label>
						</div>
						<label htmlFor="biograph" className="space-y-5 w-full">
							<span className="text-xl font-medium">Bio Graf</span>
							<Textarea
								className={`${InputClass} p-3 font-medium`}
								id="alamat"
								{...register("biograph")}
							/>
						</label>
						<MyButton
							color="space2"
							className="text-lg font-semibold p-7 self-end"
							type="submit"
						>
							Verify <ArrowBigRightDashIcon />
						</MyButton>
					</form>
				</div>
			</section>
		</>
	);
}
