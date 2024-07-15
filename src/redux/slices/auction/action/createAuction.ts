import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { updateModalStatus } from "../../modal/modal.slice";
import apiInstance from "../../../../api/api";

const api = apiInstance()

export interface CreateAuctioPayload {
  name: string;
}

export const createAuction= createAsyncThunk(
  "createAuction",
  async (productPayload: CreateAuctioPayload, { dispatch }) => {
    const auctionUrl = `/auction/create`;

    try {
      const categoryResponse = await api.post(auctionUrl, productPayload);
      const message = categoryResponse.data.message;
      if (message === "Auction" && categoryResponse.data.createdAuction) {
        // dispatch()
        enqueueSnackbar(message, { variant: "success" });
        dispatch(updateModalStatus());
      }

      return categoryResponse.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
