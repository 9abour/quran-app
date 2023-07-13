import React, { ReactNode } from "react";

interface Props {
	text: string;
	icon?: ReactNode;
	customStyles?: string;
	onclick?: () => void;
}

const Button = ({ text, icon, customStyles, onclick }: Props) => {
	return (
		<button
			className={`h-[45px] text-primary-gray-2 font-semibold capitalize f-c hover:opacity-90 px-3 py-2 rounded-md transition ${customStyles}`}
			onClick={onclick}
		>
			<span>{icon}</span>
			<span>{text}</span>
		</button>
	);
};

export default Button;
