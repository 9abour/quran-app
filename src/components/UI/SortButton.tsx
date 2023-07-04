import React, { ReactNode } from "react";

interface Props {
	text: string;
	icon?: ReactNode;
	customStyles?: string;
	active: boolean;
	onclick?: () => void;
}

const SortButton = ({ text, icon, customStyles, active, onclick }: Props) => {
	return (
		<button
			className={`!text-primary-gray-2 font-semibold capitalize f-c gap-1 bg-${
				active ? "white" : "transparent"
			} hover:bg-white px-3 py-2 rounded-md transition ${customStyles}`}
			onClick={onclick}
		>
			<span>{icon}</span>
			<div className="text-start">
				<p className="text-sm font-medium">Sort By</p>
				<p className="text-lg text-primary-gray font-semibold">{text}</p>
			</div>
		</button>
	);
};

export default SortButton;
