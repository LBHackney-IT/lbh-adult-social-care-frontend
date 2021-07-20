import { createSlice } from '@reduxjs/toolkit';

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState: {
    isOpened: false,
  },
  reducers: {
    openMobileMenu: (state) => {
      return {
        ...state,
        isOpened: true,
      }
    },
    closeMobileMenu: (state) => {
      return {
        ...state,
        isOpened: false,
      }
    },
  },
});

// Actions
export const {
  openMobileMenu,
  closeMobileMenu,
} = mobileMenuSlice.actions;

// Selectors
const selectMobileMenu = (state) => {
  return state.mobileMenu;
};
export { selectMobileMenu, mobileMenuSlice };

// Reducer
export default mobileMenuSlice.reducer;
