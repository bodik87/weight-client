import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: { token: null, userData: null },
  reducers: {
    setCredentials: (state, action) => {
      const { userData, accessToken } = action.payload;
      state.token = accessToken;
      state.userData = userData;
    },
    logOut: (state) => {
      state.token = null;
      state.userData = null;
    },
    setData: (state, action) => {
      const { userData } = action.payload;
      state.userData = userData;
    },
  },
});

export const { setCredentials, logOut, setData } = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentState = (state) => state.auth;
