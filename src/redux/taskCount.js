import { createSlice } from "@reduxjs/toolkit";

export const taskCountSlice = createSlice({
  name: "taskCount",
  initialState: {
    taskCount: 0,
  },
  reducers: {
    getTaskCount(state, action) {
      state.taskCount = action.payload;
    },
  },
});

export const { getTaskCount } = taskCountSlice.actions;

export default taskCountSlice.reducer;
