"use client";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
	const [list, setList] = useState<string[]>([""]);
	return (
		<>
			<h1>To do List</h1>
			<AnimatePresence>
				{list.map((item) => (
					<motion.div
						key={item}
						initial={{ opacity: 0, x: 200 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 200 }}
						transition={{ ease: "easeInOut" }}
					>
						{item}
					</motion.div>
				))}
			</AnimatePresence>
			<button
				type="button"
				onClick={() => setList([...list, `Item ${list.length + 1}`])}
			>
				Click +
			</button>
			<motion.button
				type="button"
				className="duration-300"
				onClick={() => setList([...list.splice(0, list.length - 1)])}
			>
				Click -
			</motion.button>
			<div>
				Ayam Goreng
				<motion.div
					animate={"hilang"}
					variants={divVariant2}
					className={"w-20"}
				>
					<motion.div variants={divVariant}>Ayam</motion.div>
					<motion.div variants={divVariant}>Bebek</motion.div>
				</motion.div>
			</div>
		</>
	);
}

const divVariant: Variants = {
	muncul: {
		opacity: 1,
		x: 0,
	},
	hilang: {
		opacity: 0,
		x: 200,
	},
};

const divVariant2: Variants = {
	muncul: {
		opacity: 1,
		x: 0,
	},
	hilang: {
		opacity: 0,
		x: 200,
		transition: {
			staggerChildren: 0.1,
			duration: 10,
			when: "afterChildren",
		},
	},
};
