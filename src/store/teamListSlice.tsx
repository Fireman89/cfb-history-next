"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Team } from "../type/team";

export interface TeamListState {
  teamList: Team[];
}

const initialState: TeamListState = {
  teamList: [],
};

const teamListSlice = createSlice({
  name: "teamList",
  initialState,
  reducers: {
    setTeamList: (state, action: PayloadAction<Team[]>) => {
      state.teamList = action.payload;
    },
  },
});

export const { setTeamList } = teamListSlice.actions;
export default teamListSlice.reducer;
