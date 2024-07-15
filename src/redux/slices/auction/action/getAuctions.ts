import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../../../api/api";

const api = apiInstance()


export const getAuction= createAsyncThunk(
  "getAuction",
  async (params, { dispatch }) => {
    const auctionUrl = `/auction/get-all`;

    try {
      const AuctionResponse = await api.get(auctionUrl);
      if (AuctionResponse.status === 200 && AuctionResponse.data) {
        return AuctionResponse.data.auctions.docs;
      }

      
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
