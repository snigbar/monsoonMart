import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuhthenticated: false,
  },
  reducers: {
    authenticate: (state) => {
      state.isAuhthenticated = !state.isAuhthenticated;
    },
  },
});

export const { authenticate } = userSlice.actions;
export default userSlice.reducer;
