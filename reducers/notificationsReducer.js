import { createSlice } from '@reduxjs/toolkit';

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
      const cloneVisible = state.visibleNotifications.filter((visible) => visible.text !== payload.text);
      return {
        ...state,
        visibleNotifications: [...cloneVisible, payload],
        notifications: state.notifications.slice(1, state.notifications.length),
      };
    },
    changeNotificationsLimit: (state, { payload }) => ({
      ...state,
      notificationsLimit: payload,
    }),
    removeNotification: (state, { payload }) => {
      const cloneVisible = state.visibleNotifications.filter((visible) => visible.text !== payload.text);
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
      }
    },
    addNotification: (state, { payload }) => ({
      ...state,
      notifications: [...state.notifications, {
        // time: 'debugger',
        time: 3000,
        className: 'error',
        text: 'Something went wrong',
        ...payload,
      }],
      logoutNotification: payload?.text === 'logout' ? 'logout' : '',
    }),
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
