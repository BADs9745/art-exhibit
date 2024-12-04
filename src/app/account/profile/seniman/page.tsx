import SenimanProfile from "@/components/custom/profile/seniman/senimanProfile";
import SenimanVerify from "@/components/custom/profile/seniman/senimanVerify";
import { GetSenimanProfile } from "@/util/account/profile/seniman/action";
import { Suspense } from "react";

export default async function SenimanProfilePage() {
	const senimanId = await GetSenimanProfile();
	return (
		<>
			{senimanId ? (
				<Suspense fallback={<div>Loading...</div>}>
					<SenimanProfile />
				</Suspense>
			) : (
				<SenimanVerify />
			)}
		</>
	);
}
