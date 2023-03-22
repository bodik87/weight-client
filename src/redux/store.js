import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./userSlice";
import dateSlice from "./dateSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: userSlice,
    date: dateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
