import { createSlice } from "@reduxjs/toolkit";
import {brokerageTestData} from "../testData/brokerage";

const { homeCare, nurseCare } = brokerageTestData;

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
