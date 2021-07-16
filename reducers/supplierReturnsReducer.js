import { createSlice } from '@reduxjs/toolkit';

const supplierReturnsSlice = createSlice({
  name: 'supplierReturns',
  initialState: {
    supplierReturns: {},
    weekOfSupplier: {},
    data: {},
  },
  reducers: {
    getSupplierReturnsSuccess: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        data: payload,
      };
    },
    changeSupplierReturns: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        supplierReturns: payload,
      };
    },
    changeWeekOfSupplier: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        weekOfSupplier: payload,
      };
    },
  },
});

// Actions
export const { changeSupplierReturns, changeWeekOfSupplier } = supplierReturnsSlice.actions;

// Selectors
const selectSupplierReturns = (state) => state.supplierReturns;
export { selectSupplierReturns, supplierReturnsSlice };

// Reducer
export default supplierReturnsSlice.reducer;
