import { lazy } from "react";

const HomeCom = lazy(() => import("@/components/Home/Index"));

export default function Home() {
	return <HomeCom />;
}
