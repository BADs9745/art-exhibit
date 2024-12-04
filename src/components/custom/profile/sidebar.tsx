"use client";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
	LayoutDashboardIcon,
	Settings2Icon,
	MenuIcon,
	ArrowRightFromLineIcon,
	ArrowLeftToLineIcon,
} from "lucide-react";
import { kreon } from "@/fonts/font";
import PaperFeatherPenIcon from "@/icons/paper-featherpen";

type ListSetting = [string, string, ReactNode];

const profilepath = "/account/profile";

const listSetting: ListSetting[] = [
	["Dashboard", "/", <LayoutDashboardIcon key={"Dashboard"} />],
	["General", `${profilepath}/`, <Settings2Icon key={"General"} />],
	[
		"Maestro",
		`${profilepath}/seniman`,
		<PaperFeatherPenIcon key={"Maestro"} />,
	],
];

const menuTxt: Variants = {
	close: {
		opacity: 0,
	},
	open: {
		opacity: 1,
	},
};

const menuBtn: Variants = {
	close: {
		opacity: 0,
	},
	open: {
		opacity: 1,
	},
};

export default function ProfileSideBard() {
	const [show, setShow] = useState(false);

	return (
		<AnimatePresence mode="sync">
			<motion.aside
				className="max-w-60 min-h-screen bg-space-2 pt-5 flex flex-col items-center z-50 duration-300 relative"
				initial={{ width: 0 }}
				animate={{
					opacity: 1,
					width: show ? 240 : 60,
					transition: {
						duration: 0.1,
						ease: "linear",
					},
				}}
			>
				<button
					type="button"
					className="rounded-e-full size-fit text-space-4 bg-space-2 hover:text-space-3 duration-300 p-3 left-full top-0 absolute"
					onClick={() => {
						setShow(!show);
					}}
				>
					{show ? <ArrowLeftToLineIcon /> : <ArrowRightFromLineIcon />}
				</button>
				{show ? (
					<motion.div
						variants={menuTxt}
						initial={"close"}
						animate={"open"}
						exit={"close"}
						transition={{ duration: 0.3 }}
						key={"menuTxt"}
						className="w-full overflow-clip"
					>
						<h1
							className={`${kreon.className} text-2xl text-center font-semibold w-full`}
						>
							Settings
						</h1>
						<div className="mt-10 flex flex-col items-start space-y-4 w-full">
							{listSetting.map(([key, value]) => (
								<Link
									key={key?.toString()}
									href={`${value}`}
									className="w-full"
								>
									<div
										className={
											"text-space-4 hover:text-space-3 duration-300 w-full py-3 text-lg text-nowrap text-start border-s-2 border-transparent hover:border-space-3 indent-4 group"
										}
									>
										<div className="group-hover:translate-x-3 duration-300">
											{key}
										</div>
									</div>
								</Link>
							))}
						</div>
					</motion.div>
				) : (
					<motion.div
						variants={menuBtn}
						initial={"close"}
						animate={"open"}
						exit={"close"}
						transition={{ duration: 0.3 }}
						key={"menuBtn"}
						className="overflow-clip"
					>
						<h1 className="text-2xl text-center font-semibold w-full">
							<MenuIcon className="m-auto" />
						</h1>
						<div className="mt-10 flex flex-col space-y-4">
							{listSetting.map(([key, value, icon]) => (
								<Link key={key?.toString()} href={`${value}`}>
									<div
										className={
											"text-space-4 fill-space-4 hover:text-space-3 hover:fill-space-3 duration-300 w-full p-3 rounded-xl border-2 border-transparent hover:border-space-3"
										}
									>
										{icon}
									</div>
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</motion.aside>
		</AnimatePresence>
	);
}
