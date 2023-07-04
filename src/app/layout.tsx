"use client";

import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import { store } from "./rtk/store";
import { Provider } from "react-redux";

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
						<Provider store={store}>
							<Sidebar />
							{children}
						</Provider>
					</section>
				</main>
			</body>
		</html>
	);
}
