import { createSlice } from "@reduxjs/toolkit";

const connectionSLice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnection } = connectionSLice.actions;
export default connectionSLice.reducer;
