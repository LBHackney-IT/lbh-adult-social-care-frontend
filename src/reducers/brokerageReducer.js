import { createSlice } from "@reduxjs/toolkit";

const testData = {
  homeCare: {
    id: 3141232,
    startDate: new Date(),
    endDate: new Date(),
    suppliers: ['Supplier 1', 'Supplier 2'],
    primaryCarrier: {hr: '', hrswk: 3, total: '$XX'},
    '30mCall': {hr: '$20', hrswk: 3, total: '$43'},
    '45mCall': {hr: '$20', hrswk: 3, total: '$43'},
    '60m+Call': {hr: '$20', hrswk: 3, total: '$43'},
    secondaryCarer: {hr: '$XX', hrswk: 3, total: '$48'},
    domesticCare: {hr: '$XX', hrswk: 3, total: '$48'},
    escortServices: {hr: '$XX', hrswk: 3, total: '$48'},
    sleepingNight: {hr: 'XX', hrswk: 3, total: '$300'},
    wakingNight: {hr: 'XX', hrswk: 3, total: '$300'},
    totalCost: '$XXXX',
  },
  nurseCare: {
    client: 'James Stephens',
    hackneyid: '786288',
    age: new Date(1972, 9, 12),
    postcode: 'E9 6EY',
    sourcingCare: 'hackney',
    starts: new Date(),
    ends: new Date(new Date().setDate(new Date().getDate() + 3)), // current day + 3 days
    approvalHistory: [
      {date: new Date(2021, 3, 12), stage: 'Package Builder', action: 'Submitted for approval'},
      {date: new Date(2021, 3, 12), stage: 'Approval of package', action: 'Accepted'},
      {date: new Date(2021, 3, 12), stage: 'Approval of package', action: 'Queried'},
      {date: new Date(2021, 3, 12), stage: 'Approval of package', action: 'Rejected'},
      {date: new Date(2021, 3, 12), stage: 'Broker', action: 'Assigned'},
      {date: new Date(2021, 3, 12), stage: 'Broker', action: 'Submitted for approval'},
      {date: new Date(2021, 3, 12), stage: 'Broker', action: 'Re-submitted for approval'},
      {date: new Date(2021, 3, 12), stage: 'Approval', action: 'Approved'},
      {date: new Date(2021, 3, 12), stage: 'Approval', action: 'PO Send by system'},
    ]
  }
};

const { homeCare, nurseCare } = testData;

const brokerageSlice = createSlice({
  name: "user",
  initialState: {
    homeCare: {
      id: homeCare.id,
      startDate: homeCare.startDate,
      endDate: homeCare.endDate,
      suppliers: homeCare.suppliers,
      primaryCarrier: homeCare.primaryCarrier,
      '30mCall': homeCare['30mCall'],
      '45mCall': homeCare['45mCall'],
      '60m+Call': homeCare['60m+Call'],
      secondaryCarer: homeCare.secondaryCarer,
      domesticCare: homeCare.domesticCare,
      escortServices: homeCare.escortServices,
      sleepingNight: homeCare.sleepingNight,
      wakingNight: homeCare.wakingNight,
      totalCost: homeCare.totalCost,
    },
    nurseCare: {
      client: nurseCare.client,
      hackneyid: nurseCare.hackneyid,
      age: nurseCare.age,
      postcode: nurseCare.postcode,
      sourcingCare: nurseCare.sourcingCare,
      starts: nurseCare.starts,
      ends: nurseCare.ends,
    }
  },
  reducers: {
    getBrokerageSuccess: (state, action) => {
      return {
        ...state,
        fail: false,
        success: true,
        homeCare: action.payload.homeCare,
        nurseCare: action.payload.nurseCare,
      }
    },
    getBrokerageFail: (state) => {
      return {
        ...state,
        fail: true,
        success: false,
      }
    },
  },
});

// Actions
export const {
  getBrokerageRequest,
  getBrokerageSuccess,
  getBrokerageFail
} = brokerageSlice.actions;

// Selectors
const selectBrokerage = (state) => {
  return state.brokerage;
};
export { selectBrokerage, brokerageSlice };

// Reducer
export default brokerageSlice.reducer;
