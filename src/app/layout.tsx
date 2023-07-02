import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
	title: "Quran App",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<section className="bg-white">
					<Navbar />
				</section>
				<main>
					<section className="block lg:flex">
						<Sidebar />
						{children}
					</section>
				</main>
			</body>
		</html>
	);
}
