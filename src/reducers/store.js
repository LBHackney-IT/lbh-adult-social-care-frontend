import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import brokerageReducer from "./brokerageReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    brokerage: brokerageReducer,
  },
});
