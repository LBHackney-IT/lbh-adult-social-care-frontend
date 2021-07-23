import { combineReducers } from 'redux';
import userReducer from './userReducer';
import brokerageReducer from './brokerageReducer';
import supplierDashboardReducer from './supplierDashboardReducer';
import supplierReturnsReducer from './supplierReturnsReducer';
import notificationsReducer from './notificationsReducer';
import mobileMenuReducer from './mobileMenuReducer';
import carePackageReducer from './carePackageSlice';

const reducers = {
  user: userReducer,
  brokerage: brokerageReducer,
  supplierDashboard: supplierDashboardReducer,
  supplierReturns: supplierReturnsReducer,
  notifications: notificationsReducer,
  mobileMenu: mobileMenuReducer,
  carePackage: carePackageReducer,
};

export default combineReducers(reducers);
