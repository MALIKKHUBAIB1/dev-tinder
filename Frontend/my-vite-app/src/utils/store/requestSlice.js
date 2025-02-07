import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removePendingRequest: (state, action) => {
      return state.filter((item) => item.formUserID._id !== action.payload);
    },
  },
});

export const { addRequest, removePendingRequest } = requestSlice.actions;
export default requestSlice.reducer;
