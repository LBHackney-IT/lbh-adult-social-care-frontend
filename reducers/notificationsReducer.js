import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    showedNotifications: [],
    logoutNotification: '',
  },
  reducers: {
    showNotification: (state, { payload }) => {
      const cloneNotifications = state.showedNotifications.slice();
      cloneNotifications.push(payload);
      return {
        ...state,
        showedNotifications: cloneNotifications,
      };
    },
    removeNotification: (state, { payload }) => {
      const cloneNotifications = state.notifications.filter((notification) => notification.text !== payload.text);
      const cloneShowed = state.showedNotifications.filter((showed) => showed.text !== payload.text);
      return {
        ...state,
        notifications: cloneNotifications,
        showedNotifications: cloneShowed,
      };
    },
    addNotification: (state, { payload }) => {
      const cloneNotifications = state.notifications.slice();
      cloneNotifications.push({
        time: 4000,
        className: 'error',
        text: 'Something went wrong',
        ...payload,
      });
      return {
        ...state,
        notifications: cloneNotifications,
        logoutNotification: payload?.text === 'logout' ? 'logout' : '',
      };
    },
    removeNotifications: (state) => ({
      ...state,
      notifications: [],
      showedNotifications: [],
    }),
  },
});

// Actions
export const { removeNotification, removeNotifications, showNotification, addNotification } =
  notificationsSlice.actions;

// Selectors
const selectNotifications = (state) => state.notifications;
export { selectNotifications, notificationsSlice };

// Reducer
export default notificationsSlice.reducer;
