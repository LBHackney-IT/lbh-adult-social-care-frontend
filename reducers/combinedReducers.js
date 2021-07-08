import { combineReducers } from "redux";
import userReducer from "./userReducer";
import brokerageReducer from "./brokerageReducer";
import supplierDashboardReducer from "./supplierDashboardReducer";
import supplierReturnsReducer from "./supplierReturnsReducer";
import homeCareTimeSlotShiftsReducer from "../pages/care-package/home-care/slices/homeCareTimeSlotShiftsSlice";
import homeCareServicesReducer from "../pages/care-package/home-care/slices/homeCareServicesSlice";

const reducers = {
  user: userReducer,
  brokerage: brokerageReducer,
  supplierDashboard: supplierDashboardReducer,
  supplierReturns: supplierReturnsReducer,
  homeCareTimeSlotShifts: homeCareTimeSlotShiftsReducer,
  homeCareServices: homeCareServicesReducer,
};

export default combineReducers(reducers);
