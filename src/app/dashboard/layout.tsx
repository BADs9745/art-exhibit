import RootFooter from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar";

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<section>
			<Navbar />
			<section>{children}</section>
			<RootFooter />
		</section>
	);
}