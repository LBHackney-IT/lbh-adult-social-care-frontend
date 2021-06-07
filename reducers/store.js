import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import brokerageReducer from "./brokerageReducer";
import supplierDashboardReducer from "./supplierDashboardReducer";
import supplierReturnsReducer from "./supplierReturnsReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    brokerage: brokerageReducer,
    supplierDashboard: supplierDashboardReducer,
    supplierReturns: supplierReturnsReducer,
  },
});
