"use client";

import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./currentScheduleSlice";
import currentLogoReducer from "./currentLogoSlice";
import scheduleListReducer from "./scheduleListSlice";
import teamListReducer from "./teamListSlice";

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    teamList: teamListReducer,
    currentLogo: currentLogoReducer,
    scheduleList: scheduleListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
