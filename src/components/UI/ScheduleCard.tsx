import React from "react";
import Button from "./Button";
import { BiCheckbox, BiTimeFive } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";
import { useAppDispatch } from "@/app/rtk/hooks";
import {
	removeSchedule,
	setCompletedSchedule,
	updateScheduleListToLS,
} from "@/app/rtk/slices/scheduleSlice";

export interface ScheduleCardType {
	date: string;
	text: string;
	time: string;
	completed?: boolean;
}

interface Props {
	schedule: ScheduleCardType;
}

const ScheduleCard = (schedule: Props) => {
	const { date, text, time, completed } = schedule.schedule;

	const dispatch = useAppDispatch();

	return (
		<div className="shadow-sm border rounded-md">
			<div className="bg-slate-50 p-4">
				<h3 className="px-2 bg-primary-color w-fit rounded-md text-white !py-0">
					{date}
				</h3>
				<h3 className="font-semibold text-primary-gray pt-4 pb-6 w-full line-clamp-2">
					{text}
				</h3>
				<hr />
				<span className="f-c !justify-start gap-2 text-primary-gray-2 font-semibold mt-3">
					<BiTimeFive size={25} />
					<p>{time}</p>
				</span>
			</div>
			<div className="flex justify-between items-center">
				<Button
					text=""
					icon={<RiDeleteBin7Line size={25} />}
					customStyles="hover:text-red-500"
					onclick={() => {
						dispatch(removeSchedule(text));
						dispatch(updateScheduleListToLS());
					}}
				/>
				<Button
					text=""
					icon={
						completed ? (
							<BsCheckAll className="text-primary-color" size={30} />
						) : (
							<BiCheckbox size={30} />
						)
					}
					onclick={() => {
						dispatch(setCompletedSchedule(text));
						dispatch(updateScheduleListToLS());
					}}
					customStyles="hover:text-primary-color-4"
				/>
			</div>
		</div>
	);
};

export default ScheduleCard;
