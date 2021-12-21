import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialNotification = {
  time: 3000,
  className: 'error',
  text: 'Something went wrong',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notificationsLimit: 2,
    notifications: [],
    visibleNotifications: [],
    logoutNotification: '',
  },
  reducers: {
    showNotification: (state, { payload }) => {
      const cloneVisible = [...state.visibleNotifications, payload]
      return {
        ...state,
        visibleNotifications: cloneVisible,
        notifications: state.notifications.slice(1, state.notifications.length),
      };
    },
    changeNotificationsLimit: (state, { payload }) => ({
      ...state,
      notificationsLimit: payload,
    }),
    removeNotification: (state, { payload }) => {
      const cloneVisible = state.visibleNotifications.filter((visible) => visible.id !== payload.id);
      return {
        ...state,
        visibleNotifications: cloneVisible,
      };
    },
    activateTimers: (state) => {
      const cloneVisible = state.visibleNotifications.map((visible) => ({ ...visible, activeTimer: true }));
      return {
        ...state,
        visibleNotifications: cloneVisible,
      };
    },
    addNotification: (state, { payload }) => {
      let notificationsArray = [{
        // time: 'debugger',
        ...initialNotification,
        id: uuidv4(),
        ...payload,
      }];

      if (Array.isArray(payload.text)) {
        notificationsArray = payload.text.map((text) => ({
          ...initialNotification,
          ...payload,
          id: uuidv4(),
          text,
        }));
      }

      return {
        ...state,
        notifications: [...state.notifications, ...notificationsArray],
        logoutNotification: payload?.text === 'logout' ? 'logout' : '',
      };
    },
    removeNotifications: (state) => ({
      ...state,
      notifications: [],
      visibleNotifications: [],
    }),
  },
});

// Actions
export const {
  removeNotification,
  removeNotifications,
  showNotification,
  activateTimers,
  addNotification,
  changeNotificationsLimit,
} = notificationsSlice.actions;

// Selectors
const selectNotifications = (state) => state.notifications;
export { selectNotifications, notificationsSlice };

// Reducer
export default notificationsSlice.reducer;
