import React from "react";
import Button from "./Button";
import { BiTimeFive } from "react-icons/bi";

export interface ScheduleCardType {
	date: string;
	text: string;
	time: string;
}

const ScheduleCard = ({ date, text, time }: ScheduleCardType) => {
	return (
		<div className="hidden lg:block">
			<div className="bg-slate-50 rounded-md p-4">
				<Button
					text={date}
					customStyles="bg-primary-color hover:!bg-primary-color !text-white hover:!text-white !py-0 cursor-auto"
				/>
				<h3 className="font-semibold text-primary-gray pt-4 pb-6 w-full line-clamp-2">
					Read {text}
				</h3>
				<hr />
				<span className="f-c !justify-start gap-2 text-primary-gray-2 font-semibold mt-3">
					<BiTimeFive size={25} />
					<p>{time}</p>
				</span>
			</div>
			<Button
				text="Add Schedule"
				customStyles="bg-primary-color !text-white mt-2 mx-auto border shadow-sm"
			/>
		</div>
	);
};

export default ScheduleCard;
