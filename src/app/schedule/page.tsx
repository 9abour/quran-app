import React, { lazy } from "react";

const ScheduleCom = lazy(() => import("@/components/Schedule/Index"));

const page = () => {
	return <ScheduleCom />;
};

export default page;
