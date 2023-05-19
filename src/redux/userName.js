import { createSlice } from "@reduxjs/toolkit";

export const userNameSlice = createSlice({
  name: "userName",
  initialState: {
    name: '',
  },
  reducers: {
    getUserName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { getUserName } = userNameSlice.actions;

export default userNameSlice.reducer;