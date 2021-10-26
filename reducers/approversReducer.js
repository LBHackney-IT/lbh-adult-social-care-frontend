import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: '',
  postcode: '',
};

const approversSearchSlice = createSlice({
  name: 'approversSearch',
  initialState,
  reducers: {
    clearSearch: () => ({ ...initialState }),
    changeSearch: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

// Actions
export const { changeSearch, clearSearch } = approversSearchSlice.actions;

// Selectors
const selectApproversSearch = (state) => {
  return state.approversSearch;
};
export { selectApproversSearch, approversSearchSlice };

// Reducer
export default approversSearchSlice.reducer;
