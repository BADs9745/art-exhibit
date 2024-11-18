"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./searchBar";
import { motion, type Variant } from "framer-motion";
import ProfileAvatar from "./profileAvatar";
import { jockeOne } from "@fonts/font";

type navType = {
	navtxt: string;
	href: string;
};

const navItem: navType[] = [
	{
		navtxt: "Home",
		href: "/dashboard",
	},
	{
		navtxt: "About",
		href: "/dashboard/about",
	},
	{
		navtxt: "More",
		href: "/dashboard/more",
	},
	{
		navtxt: "Contact",
		href: "/dashboard/contact",
	},
	{
		navtxt: "Trending",
		href: "/dashboard/trending",
	},
];

export default function Navbar() {
	const route = usePathname();
	const [position, setPosotion] = useState(0);
	const [width, setWidth] = useState(0);
	const [opacity, setOpacity] = useState(0);
	const [duration, setDuration] = useState(0);
	const navli = useRef<(HTMLLIElement | null)[]>([]);

	useEffect(() => {
		const activeIndex = navItem.findIndex((nav) => nav.href === route);
		const activeLi = navli.current[activeIndex];
		setWidth(() => activeLi?.offsetWidth ?? 0);
		setPosotion(() => activeLi?.offsetLeft ?? 0);
		const opac = navItem.find((n) => n.href === route) ? 1 : 0;
		setOpacity(opac);
	}, [route]);
	type animationVariant = {
		[index: string]: Variant;
	};

	const sliderVariants: animationVariant = {
		slider: {
			left: position,
			opacity: opacity,
			width: width,
			transition: { duration: duration, ease: [0.43, 0.13, 0.23, 0.96] },
		},
	};
	const clickHandler = () => {
		setDuration(0.7);
	};

	return (
		<nav
			className={clsx(
				"flex pt-10 pb-2 px-3 border-b-1 border-space-4 sticky top-0 w-screen z-10 bg-space-1 bg-cover",
			)}
		>
			<h1
				className={`text-5xl text-white m-4 font-semibold cursor-default ${jockeOne.className} uppercase`}
			>
				ARTSPACE
			</h1>
			<div
				className="w-1 my-1 mx-5 bg-white"
				// Divider
			/>
			<ul
				className={`${jockeOne.className} flex relative mx-5 items-center`}
				onMouseEnter={clickHandler}
			>
				<motion.div
					// Navbar Cursor
					variants={sliderVariants}
					animate={"slider"}
					key={"Navbar Cursor"}
					className={"absolute h-12 bg-space-4 z-[1] rounded-sm"}
				/>
				{navItem.map((nav, index) => {
					return (
						<li
							// NavBar Item
							key={nav.navtxt}
							ref={(li) => {
								navli.current[index] = li;
							}}
						>
							<Link href={nav.href} className={""}>
								<div
									className="w-auto mx-1 flex items-center px-10 py-3 justify-center bg-clip-text duration-300 relative border-b-2
								 hover:border-space-4 hover:translate-y-1 border-transparent z-[2] text-xl font-semibold uppercase"
								>
									<span
										className={clsx("delay-300 duration-300", {
											"text-space-1": route === nav.href,
										})}
									>
										{nav.navtxt}
									</span>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
			<div className="flex justify-end w-full px-5 gap-x-4 items-center">
				<SearchBar />
				<ProfileAvatar />
			</div>
		</nav>
	);
}
