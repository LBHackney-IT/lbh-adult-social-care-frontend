import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Actions
export const { login, logout } = userSlice.actions;

// Selectors
const selectUser = (state) => {
  return state.user.user;
};
export { selectUser, userSlice };

// Reducer
export default userSlice.reducer;
