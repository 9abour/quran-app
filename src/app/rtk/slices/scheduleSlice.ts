import { createSlice } from "@reduxjs/toolkit";

export interface ScheduleType {
	date: string;
	text: string;
	time: string;
	completed: boolean;
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
				if (schedule.text == scheduleToAdd.text) {
					isDuplicated = true;
				}
			});

			if (!isDuplicated) {
				state.scheduleList.push(action.payload);
				localStorage.setItem(
					"scheduleList",
					JSON.stringify(state.scheduleList)
				);
			}
		},
		removeSchedule: (state, action) => {
			const itemToRemove = action.payload;

			const updated = state.scheduleList.filter(
				item => item.text != itemToRemove
			);

			state.scheduleList = updated;
		},
		setScheduleFromLS: state => {
			const scheduleListFromLS = localStorage.getItem("scheduleList");

			if (scheduleListFromLS != null) {
				state.scheduleList = JSON.parse(scheduleListFromLS);
			}
		},
		updateScheduleListToLS: state => {
			localStorage.setItem("scheduleList", JSON.stringify(state.scheduleList));
		},
		setCompletedSchedule: (state, action) => {
			const updated = state.scheduleList.map(item => {
				if (item.text == action.payload) {
					return {
						...item,
						completed: !item.completed,
					};
				} else {
					return item;
				}
			});

			state.scheduleList = updated;
		},
	},
});

export const {
	addSchedule,
	removeSchedule,
	setScheduleFromLS,
	setCompletedSchedule,
	updateScheduleListToLS,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
