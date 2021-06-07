import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
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
export const { login, logout } = userReducer.actions;

// Selectors
const selectUser = (state) => {
  return state.user.user;
};
export { selectUser, userReducer };

// Reducer
export default userReducer.reducer;
