import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-named-as-default
import userReducer from './userReducer';
import brokerageReducer from './brokerageReducer';
import supplierDashboardReducer from './supplierDashboardReducer';
import supplierReturnsReducer from './supplierReturnsReducer';
import notificationsReducer from './notificationsReducer';

const reducers = {
  user: userReducer,
  brokerage: brokerageReducer,
  supplierDashboard: supplierDashboardReducer,
  supplierReturns: supplierReturnsReducer,
  notifications: notificationsReducer,
};

export default combineReducers(reducers);
