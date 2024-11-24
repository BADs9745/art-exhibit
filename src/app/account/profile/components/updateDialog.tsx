"use client";
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { EditIcon, SaveIcon } from "lucide-react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { MyButton as Button } from "@/components/custom/myButton";
import { UpdateProfile } from "../update/action";
import { useState, type HTMLAttributes } from "react";
import LoadingIcon from "@/icons/loadingIcon";
export const UpdateDialog = ({
	label,
	val,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	label: string;
	val: string;
}) => {
	const { register, getValues } = useForm();
	const [loading, setLoading] = useState(false);
	const handleSave = useDebouncedCallback((data: string) => {
		UpdateProfile(label, data);
	}, 1250);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button color="space2" className="font-semibold">
					Edit <EditIcon />
				</Button>
			</DialogTrigger>
			<DialogContent
				className={`sm:max-w-[425px] border-none ${props.className}`}
			>
				<DialogHeader>
					<DialogTitle>Edit {label}</DialogTitle>
					<DialogDescription>Edit your {label}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							{label}
						</Label>
						<Input
							id="name"
							defaultValue={val}
							type={label === "No Telepon" ? "number" : "text"}
							validationBehavior="native"
							className="col-span-3 text-space-1"
							{...register(label)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						color="space2"
						onClick={() => {
							const data = getValues(label);
							setLoading(true);
							handleSave(data);
						}}
						className="font-semibold"
					>
						{loading ? (
							<>
								Loading <LoadingIcon className="stroke-space-4" />
							</>
						) : (
							<>
								Save <SaveIcon />
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
