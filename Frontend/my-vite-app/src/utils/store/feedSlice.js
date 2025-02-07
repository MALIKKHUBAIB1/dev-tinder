import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      // state.push(action.payload);
      return [...action.payload];
    },
    removeFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});
export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
