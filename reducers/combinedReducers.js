import { combineReducers } from "redux";
import userReducer from "./userReducer";
import brokerageReducer from "./brokerageReducer";
import supplierDashboardReducer from "./supplierDashboardReducer";
import supplierReturnsReducer from "./supplierReturnsReducer";

const reducers = {
  user: userReducer,
  brokerage: brokerageReducer,
  supplierDashboard: supplierDashboardReducer,
  supplierReturns: supplierReturnsReducer,
};

export default combineReducers(reducers);
