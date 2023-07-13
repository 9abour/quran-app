import React, { lazy } from "react";

const ReadCom = lazy(() => import("@/components/ReadCom"));

const page = () => {
	return <ReadCom />;
};

export default page;
