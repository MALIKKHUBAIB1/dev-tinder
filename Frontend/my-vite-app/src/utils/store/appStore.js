import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feed from "./feedSlice";
import connection from "./connectionSlice";
const store = configureStore({
  reducer: {
    userReducer,
    feed,
    connection,
  },
});
export default store;
