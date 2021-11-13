import { createSlice } from '@reduxjs/toolkit';

import {
  APPROVALS_ROUTE,
  BROKER_ASSISTANCE_ROUTE,
  BROKER_PORTAL_ROUTE,
  CARE_CHARGES_ROUTE,
  FINANCE_ROUTE,
  LOGOUT_ROUTE
} from 'routes/RouteConstants';

const initialLinks = [
  { href: BROKER_ASSISTANCE_ROUTE, text: 'Broker Assistance' },
  { href: BROKER_PORTAL_ROUTE, text: 'Broker Portal' },
  { href: CARE_CHARGES_ROUTE, text: 'Care Charges' },
  { href: APPROVALS_ROUTE, text: 'Approvals' },
  { href: FINANCE_ROUTE, text: 'Finance' },
  { href: LOGOUT_ROUTE, text: 'Log out' },
];

const initialState = {
  links: [ ...initialLinks ],
  visible: true,
  fixed: false,
  className: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    showHeader: (state) => ({
      ...state,
      visible: true,
    }),
    hideHeader: (state) => ({
      ...state,
      visible: false,
    }),
    changeHeader: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    resetHeader: () => ({ ...initialState }),
  },
});

// Actions
export const {
  showHeader,
  hideHeader,
  changeHeader,
  resetHeader,
} = headerSlice.actions;

// Selectors
const selectHeader = (state) => state.header;
export { selectHeader, headerSlice };

// Reducer
export default headerSlice.reducer;