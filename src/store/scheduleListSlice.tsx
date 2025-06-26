"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Schedule from "../type/schedule";

export interface ScheduleListState {
  yearSchedules: Schedule[];
}

const initialState: ScheduleListState = {
  yearSchedules: [],
};

const scheduleListSlice = createSlice({
  name: "scheduleList",
  initialState,
  reducers: {
    setTeamSchedules: (state, action: PayloadAction<Schedule[]>) => {
      state.yearSchedules = action.payload;
    },
  },
});

export const { setTeamSchedules } = scheduleListSlice.actions;
export default scheduleListSlice.reducer;
