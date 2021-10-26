import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationsReducer from './notificationsReducer';
import mobileMenuReducer from './mobileMenuReducer';
import approversReducer from './approversReducer';

const reducers = {
  user: userReducer,
  notifications: notificationsReducer,
  mobileMenu: mobileMenuReducer,
  approversSearch: approversReducer,
};

export default combineReducers(reducers);
