import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationsReducer from './notificationsReducer';
import mobileMenuReducer from './mobileMenuReducer';
import headerReducer from './headerReducer';

const reducers = {
  user: userReducer,
  notifications: notificationsReducer,
  mobileMenu: mobileMenuReducer,
  header: headerReducer,
};

export default combineReducers(reducers);
