"use client";

import { useAppSelector } from "@/app/rtk/hooks";
import React from "react";
import ScheduleCard, { ScheduleCardType } from "../UI/ScheduleCard";

const Index = () => {
	const scheduleList = useAppSelector(
		state => state.scheduleSlice.scheduleList
	);

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-3">
			{scheduleList.map((schedule: ScheduleCardType) => (
				<ScheduleCard key={schedule.text} schedule={schedule} />
			))}
		</div>
	);
};

export default Index;
