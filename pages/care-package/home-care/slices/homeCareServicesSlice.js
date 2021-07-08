import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomeCareServices } from "../../../../api/CarePackages/HomeCareApi";

const getHomeCareServicesAsync = createAsyncThunk(
  "homeCareServices/getAll",
  async () => {
    return await getHomeCareServices();
  }
);

const homeCareServicesSlice = createSlice({
  name: "homeCareServices",
  initialState: {
    value: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeCareServicesAsync.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

const selectHomeCareServices = (state) => {
  return state.homeCareServices.value;
};

export { getHomeCareServicesAsync };
export { selectHomeCareServices, homeCareServicesSlice };
export default homeCareServicesSlice.reducer;
