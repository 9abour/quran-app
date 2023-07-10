import { AyahType } from "@/components/Home/Index";
import { createSlice } from "@reduxjs/toolkit";

export interface ScheduleType {
	surah: AyahType;
	date: string;
	text: string;
	time: string;
}

interface initialState {
	scheduleList: ScheduleType[];
}

const initialState: initialState = {
	scheduleList: [],
};

const scheduleSlice = createSlice({
	name: "schedule",
	initialState,
	reducers: {
		addSchedule: (state, action) => {
			let isDuplicated = false;
			const scheduleToAdd: ScheduleType = action.payload;

			state.scheduleList.map((schedule: ScheduleType) => {
				if (schedule.surah.number == scheduleToAdd.surah.number) {
					isDuplicated = true;
				}
			});

			if (!isDuplicated) {
				state.scheduleList.push(action.payload);
				console.log(action.payload);
			}
		},
		removeSchedule: () => {},
		getSchedule: () => {},
	},
});

export const { addSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
