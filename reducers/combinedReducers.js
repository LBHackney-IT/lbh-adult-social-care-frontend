import { combineReducers } from "redux";
import userReducer from "./userReducer";
import brokerageReducer from "./brokerageReducer";
import supplierDashboardReducer from "./supplierDashboardReducer";
import supplierReturnsReducer from "./supplierReturnsReducer";
import notificationsReducer from "./notificationsReducer";

const reducers = {
  user: userReducer,
  brokerage: brokerageReducer,
  supplierDashboard: supplierDashboardReducer,
  supplierReturns: supplierReturnsReducer,
  notifications: notificationsReducer,
};

export default combineReducers(reducers);
