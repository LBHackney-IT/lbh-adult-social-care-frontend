import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NURSING_CARE_URL } from '../api/CarePackages/NursingCareApi';
import { RESIDENTIAL_CARE_URL } from '../api/CarePackages/ResidentialCareApi';

const getOptionsHandler = (url) => async () => {
  const { data } = await axios.get(url);
  return data;
};

const mapOptions = (options) =>
  options.map((option) => ({
    text: `${option.optionName} (${option.optionPeriod})`,
    value: option.typeOfStayOptionId,
  }));

export const getResidentialTypeOfStayOptions = createAsyncThunk(
  'GET_RESIDENTIAL_TYPE_OF_STAY_OPTIONS',
  getOptionsHandler(`${RESIDENTIAL_CARE_URL}/type-of-stay-options`)
);

export const getNursingTypeOfStayOptions = createAsyncThunk(
  'GET_NURSING_TYPE_OF_STAY_OPTIONS',
  getOptionsHandler(`${NURSING_CARE_URL}/type-of-stay-options`)
);

const carePackageSlice = createSlice({
  name: 'carePackage',
  initialState: {
    residentialTypeOfStayOptions: [],
    nursingTypeOfStayOptions: [],
  },
  reducers: {},
  extraReducers: {
    [getResidentialTypeOfStayOptions.fulfilled]: (state, action) => {
      state.residentialTypeOfStayOptions = mapOptions(action.payload);
    },
    [getNursingTypeOfStayOptions.fulfilled]: (state, action) => {
      state.nursingTypeOfStayOptions = mapOptions(action.payload);
    },
  },
});

export const selectResidentialTypeOfStayOptions = (state) => state[carePackageSlice.name].residentialTypeOfStayOptions;
export const selectNursingTypeOfStayOptions = (state) => state[carePackageSlice.name].nursingTypeOfStayOptions;

export default carePackageSlice.reducer;
