import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

export const today = format(new Date(), "yyyy-MM-dd");
// console.log(new Date().toLocaleString("en-US").split(",")[0]);

const initialState = { date: today };

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    changeDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { changeDate } = dateSlice.actions;
export default dateSlice.reducer;
