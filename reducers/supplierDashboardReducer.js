import { createSlice } from '@reduxjs/toolkit';

const supplierDashboardSlice = createSlice({
  name: 'supplierDashboard',
  initialState: {
    supplierReturnsDashboard: {},
    data: {},
  },
  reducers: {
    getSupplierDashboardSuccess: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        data: payload,
      };
    },
    changeSupplierReturnsDashboard: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        supplierReturnsDashboard: payload,
      };
    },
  },
});

// Actions
export const { changeSupplierReturnsDashboard } = supplierDashboardSlice.actions;

// Selectors
const selectSupplierDashboard = (state) => state.supplierDashboard;
export { selectSupplierDashboard, supplierDashboardSlice };

// Reducer
export default supplierDashboardSlice.reducer;
