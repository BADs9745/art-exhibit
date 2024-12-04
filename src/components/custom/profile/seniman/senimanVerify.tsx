"use client";
import { kreon } from "@/fonts/font";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { MyButton } from "../../myButton";

const header: Variants = {
	init: { y: -100, opacity: 0 },
	show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};
export default function SenimanVerify() {
	return (
		<>
			<motion.header
				className="flex justify-center items-center w-full p-10 bg-space-3/10"
				initial={"init"}
				animate={"show"}
				variants={header}
			>
				<h1 className={`text-3xl ${kreon.className}`}>
					{`You're not an Artist yet`}
				</h1>
			</motion.header>
			<section className="w-full flex flex-col items-center justify-center p-20 text-xl">
				<h2
					className={`${kreon.className} tracking-tight text-8xl text-center font-semibold`}
				>
					{"Join Now for Free"} <br />
					{"and"}
					<br />
					{" Unleash your Creativity"}
				</h2>
				<p className="text-center text-2xl m-10">
					{`Unleash your creativity and share your talent with the world! Join our web app's artist community today, where your art can inspire, connect, and thrive like never before.`}
				</p>
			</section>
			<section className="grid justify-center">
				<Link href={"/account/signup/seniman"}>
					<MyButton
						type="button"
						className="text-space-1 text-2xl p-10 font-semibold"
						color="space4"
					>
						Join now
					</MyButton>
				</Link>
			</section>
		</>
	);
}
