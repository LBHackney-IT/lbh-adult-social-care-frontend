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
    clearApproversSearch: () => ({ ...initialState }),
    changeApproversSearch: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

// Actions
export const { changeApproversSearch, clearApproversSearch } = approversSearchSlice.actions;

// Selectors
const selectApproversSearch = (state) => state.approversSearch;

export { selectApproversSearch, approversSearchSlice };

// Reducer
  export default approversSearchSlice.reducer;
