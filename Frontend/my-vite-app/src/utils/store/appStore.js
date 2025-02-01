import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feed from "./feedSlice";
import connection from "./connectionSlice";
import requestSlice from "./requestSlice";
const store = configureStore({
  reducer: {
    userReducer,
    feed,
    connection,
    request: requestSlice,
  },
});
export default store;
