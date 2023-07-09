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
							<div className="w-[calc(100%-32px)] lg:w-[calc(100vw-360px)] mx-auto">
								{children}
							</div>
						</Provider>
					</section>
				</main>
			</body>
		</html>
	);
}
