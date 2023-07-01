import { createSlice } from "@reduxjs/toolkit";
import ApplicationState from "../State/ApplicationState";

const initialState = {
  isLoading: false,
} as ApplicationState;

const applicationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: function (state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = applicationSlice.actions;

export default applicationSlice.reducer;
