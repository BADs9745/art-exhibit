"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
	const { id } = useParams();
	const userParam = useParams();
	return (
		<>
			<h1 className="bg-utama">Profile</h1>
		</>
	);
}
