import { AiOutlineWarning } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import React, { ReactNode, useState } from "react";

type PropsType = {
	text: string;
	icon: ReactNode;
	isOpen: boolean;
	setIsOpen: (condition: boolean) => void;
};

const Alert = ({ text, icon, isOpen, setIsOpen }: PropsType) => {
	return isOpen ? (
		<div className="relative z-20">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
			<div className="fixed inset-0 z-10 overflow-y-auto">
				<div className="flex min-h-full  justify-center p-4 items-center sm:p-0">
					<div className="min-w-full md:min-w-[30rem] bg-gray-50 px-4 py-3 flex justify-between items-center sm:px-6 rounded-md">
						<div className="w-full flex items-center gap-3">
							<button
								type="submit"
								className="min-w-[35px] min-h-[35px] f-c rounded-md bg-orange-300 text-orange-600 border border-orange-500 shadow-orange-200 text-sm font-semibold shadow-sm hover:!opacity-90"
							>
								{icon}
							</button>
							<h3 className="text-lg font-medium text-primary-gray">{text}</h3>
						</div>
						<button
							type="submit"
							className="min-w-[35px] min-h-[35px] f-c rounded-md bg-red-400 text-sm font-semibold text-white shadow-sm hover:!opacity-90"
							onClick={() => setIsOpen(!isOpen)}
						>
							<ImCross />
						</button>
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default Alert;
