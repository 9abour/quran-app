import { SurahType } from "@/components/Center/Center";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
	list: SurahType[];
}

const initialState: InitialStateType = {
	list: [],
};

const listSlice = createSlice({
	name: "list",
	initialState,
	reducers: {
		addSurah: (state, action) => {
			// let isDuplicated = false;
			// state.list.map(
			// 	(surah: SurahType) =>
			// 		surah.number == action.payload.number && (isDuplicated = true)
			// );

			const isDuplicated = state.list.some(
				surah => surah.number == action.payload.number
			);

			!isDuplicated && state.list.push(action.payload);
		},
		removeSurah: (state, action) => {
			const updated = state.list.filter(
				surah => surah.number != action.payload.number
			);

			state.list = updated;
		},
		updateSurahsList: (state, action) => {
			state.list = action.payload;
		},
	},
});

export const { addSurah, removeSurah, updateSurahsList } = listSlice.actions;
export default listSlice.reducer;
