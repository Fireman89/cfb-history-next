"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CurrentLogoState {
  useCurrentLogo: boolean;
}

const initialState: CurrentLogoState = {
  useCurrentLogo: false,
};

const currentLogoSlice = createSlice({
  name: "currentLogo",
  initialState,
  reducers: {
    setUseCurrentLogo: (state) => {
      state.useCurrentLogo = !state.useCurrentLogo; // action.payload;
    },
  },
});

export const { setUseCurrentLogo } = currentLogoSlice.actions;
export const selectUseCurrentLogo = (state: RootState) =>
  state.currentLogo.useCurrentLogo;
export default currentLogoSlice.reducer;
