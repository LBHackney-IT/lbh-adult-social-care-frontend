import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationsReducer from './notificationsReducer';
import mobileMenuReducer from './mobileMenuReducer';

const reducers = {
  user: userReducer,
  notifications: notificationsReducer,
  mobileMenu: mobileMenuReducer,
};

export default combineReducers(reducers);
