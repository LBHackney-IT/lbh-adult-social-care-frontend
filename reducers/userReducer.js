import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    userLogin: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    logout: (state) => ({
      ...state,
      user: {},
    }),
  },
});

// Actions
export const { userLogin, logout } = userSlice.actions;

// Selectors
const selectUser = (state) => state.user.user;
export { selectUser, userSlice };

// Reducer
export default userSlice.reducer;
