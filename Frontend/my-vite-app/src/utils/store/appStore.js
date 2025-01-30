import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feed from "./feedSlice";
const store = configureStore({
  reducer: {
    userReducer,
    feed,
  },
});
export default store;
