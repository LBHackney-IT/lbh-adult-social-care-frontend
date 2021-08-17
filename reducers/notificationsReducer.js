import { createSlice } from '@reduxjs/toolkit';

// EXAMPLE OF PAYLOAD
// {
//   time: 4000,
//   className: 'error',
//   text: 'Something went wrong',
// }

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notificationsLimit: 2,
    notifications: [],
    showedNotifications: [],
    logoutNotification: '',
  },
  reducers: {
    showNotification: (state, { payload }) => {
      return {
        ...state,
        showedNotifications: [...state.showedNotifications, payload],
        notifications: state.notifications.slice(1, state.notifications.length),
      };
    },
    removeNotification: (state, { payload }) => {
      const cloneShowed = state.showedNotifications.filter((showed) => showed.text !== payload.text);
      return {
        ...state,
        showedNotifications: cloneShowed,
      };
    },
    addNotification: (state, { payload }) => {
      return {
        ...state,
        notifications: [...state.notifications, {
          time: 'debugger',
          className: 'error',
          text: 'Something went wrong',
          ...payload,
        }],
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
