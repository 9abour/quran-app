import React from "react";
import List from "./List";

const Sidebar = () => {
	return (
		<div className="w-full lg:w-[350px] h-[250px] lg:h-[calc(100vh-134px)] bg-white py-4 px-4 lg:pl-4">
			<List />
		</div>
	);
};

export default Sidebar;
