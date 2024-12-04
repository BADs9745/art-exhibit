import Image from "next/image";

export default function SenimanProfile() {
	return (
		<>
			<header className="w-full flex justify-center p-2 bg-space-3/30">
				<Image
					height={320}
					width={320}
					src="/api/account/profile/picture"
					alt="Seniman Profile"
				/>
			</header>
		</>
	);
}
