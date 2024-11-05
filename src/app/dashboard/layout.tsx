import RootFooter from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar";

export default function DashboardLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<section className="flex flex-col min-h-screen">
			<Navbar />
			<section className="flex-1">{children}</section>
			<div>
				<RootFooter />
			</div>
		</section>
	);
}
