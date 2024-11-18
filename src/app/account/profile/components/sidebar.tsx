import Link from "next/link";
import clsx from "clsx";

type ListSetting = [string, string];

const profilepath = "/account/profile";

const listSetting: ListSetting[] = [
	["General", "/"],
	["Seniman", "/seniman"],
];

export default function ProfileSideBard() {
	return (
		<aside className="py-10 px-4 max-w-60 min-h-screen bg-space-2 flex flex-col items-center">
			<h1 className={"text-3xl text-start mx-20"}>Settings</h1>
			<div className="mt-10 flex flex-col space-y-4 w-full">
				{listSetting.map(([key, value]) => (
					<Link
						key={key}
						href={`${profilepath}${value}`}
						className={clsx(
							"text-space-4 hover:text-space-3 duration-300 w-full py-3 text-lg text-nowrap text-start border-s-3 border-transparent hover:border-space-3 hover:indent-7 indent-4",
						)}
					>
						{key}
					</Link>
				))}
			</div>
		</aside>
	);
}
