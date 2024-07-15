import { createSlice } from "@reduxjs/toolkit";
import { createSale, fetchSales } from "./actions";

export interface ModalState {
  sales: Array<any>;
  isLoading: boolean;
  error: boolean;
}

const initialState: ModalState = {
  sales: [],
  isLoading: false,
  error: false,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSale.pending, (state, action) => {
      state.isLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(createSale.rejected, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(createSale.fulfilled, (state, action) => {
      console.log(state);
      console.log(action);

      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });

    builder.addCase(fetchSales.pending, (state, action) => {
      state.isLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(fetchSales.rejected, (state, action) => {
      state.error = false;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(fetchSales.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.sales = payload?.data?.sales;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = salesSlice.actions;

export default salesSlice.reducer;
