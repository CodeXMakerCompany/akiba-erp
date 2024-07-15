import { createSlice } from "@reduxjs/toolkit";
import { getAuction } from "./action/getAuctions";

export interface AuctionsState {
  auctions: Array<any>;
  loading: boolean;
  error : string | null;
}

const initialState: AuctionsState = {
  auctions: [],
  loading : true,
  error : null
};

export const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuction.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
      })
      .addCase(getAuction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch auctions';
      });
  },
});

// Action creators are generated for each case reducer function
export const { } = auctionSlice.actions;

export default auctionSlice.reducer;
