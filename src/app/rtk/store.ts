import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./slices/listSlice";
import scheduleSlice from "./slices/scheduleSlice";

export const store = configureStore({
	reducer: {
		listSlice,
		scheduleSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
