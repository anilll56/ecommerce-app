import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  info: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setUser, logout, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
