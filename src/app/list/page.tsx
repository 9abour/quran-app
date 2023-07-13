import { lazy } from "react";

const ListCom = lazy(() => import("@/components/List/Index"));

const page = () => {
	return <ListCom />;
};

export default page;
