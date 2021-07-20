import { createSlice } from '@reduxjs/toolkit';
import { brokerageTestData } from '../testData/brokerageTestData';

const { homeCare, nurseCare } = brokerageTestData;

const brokerageSlice = createSlice({
  name: 'user',
  initialState: {
    dayCarePackage: {},
    homeCarePackage: {},
    nursingCarePackage: {},
    residentialCarePackage: {},
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
    },
  },
  reducers: {
    getBrokerageSuccess: (state, { payload }) => {
      return {
        ...state,
        [payload.type]: payload[payload.type],
      };
    },
    getBrokerageFail: (state) => {
      return {
        ...state,
      };
    },
  },
});

// Actions
export const { getBrokerageRequest, getBrokerageSuccess, getBrokerageFail } = brokerageSlice.actions;

// Selectors
const selectBrokerage = (state) => {
  return state.brokerage;
};
export { selectBrokerage, brokerageSlice };

// Reducer
export default brokerageSlice.reducer;
