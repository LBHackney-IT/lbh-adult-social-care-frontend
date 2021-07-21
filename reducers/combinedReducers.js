import { combineReducers } from 'redux';
import userReducer from './userReducer';
import brokerageReducer from './brokerageReducer';
import supplierDashboardReducer from './supplierDashboardReducer';
import supplierReturnsReducer from './supplierReturnsReducer';
import notificationsReducer from './notificationsReducer';
import mobileMenuReducer from './mobileMenuReducer';

const reducers = {
  user: userReducer,
  brokerage: brokerageReducer,
  supplierDashboard: supplierDashboardReducer,
  supplierReturns: supplierReturnsReducer,
  notifications: notificationsReducer,
  mobileMenu: mobileMenuReducer,
};

export default combineReducers(reducers);
