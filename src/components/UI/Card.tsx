import React, { ReactNode } from "react";

interface Props {
	title: string;
	button: ReactNode;
	content: ReactNode;
}

const Card = ({ title, button, content }: Props) => {
	return (
		<div className="card">
			<div className="flex justify-between items-center mb-3">
				<h1>{title}</h1>
				{button}
			</div>
			{content}
			<hr className="mt-8 hidden lg:visible" />
		</div>
	);
};

export default Card;
