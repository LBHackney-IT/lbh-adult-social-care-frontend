import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomeCareTimeSlotShifts } from "../../../../api/CarePackages/HomeCareApi";

const getShiftsAsync = createAsyncThunk("homeCareShifts/getAll", async () => {
  return await getHomeCareTimeSlotShifts();
});

const homeCareTimeSlotShiftsSlice = createSlice({
  name: "homeCareTimeSlotShifts",
  initialState: {
    value: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getShiftsAsync.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

const selectHomeCareTimeSlotShifts = (state) => {
  return state.homeCareTimeSlotShifts.value;
};

export { getShiftsAsync };
export { selectHomeCareTimeSlotShifts, homeCareTimeSlotShiftsSlice };
export default homeCareTimeSlotShiftsSlice.reducer;
