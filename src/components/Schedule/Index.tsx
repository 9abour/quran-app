"use client";

import { useAppSelector } from "@/app/rtk/hooks";
import React from "react";
import ScheduleCard, { ScheduleCardType } from "../UI/ScheduleCard";

const Index = () => {
	const scheduleList = useAppSelector(
		state => state.scheduleSlice.scheduleList
	);

	return (
		<>
			<h1 className="main-title">Schedule List</h1>
			{scheduleList.length ? (
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-3">
					{scheduleList.map((schedule: ScheduleCardType) => (
						<ScheduleCard key={schedule.text} schedule={schedule} />
					))}
				</div>
			) : (
				<h2 className="w-full text-xl font-semibold text-center">
					There is no schedule to show!
				</h2>
			)}
		</>
	);
};

export default Index;
