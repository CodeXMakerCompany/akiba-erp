import { createAsyncThunk } from "@reduxjs/toolkit";
import { localBaseUrl } from "../../../../constants/endpoints";
import axios from "axios";

export const getAllProducts = createAsyncThunk("product/all", async () => {
  const productsUrl = `${localBaseUrl}/product/all`;
  try {
    const productsResponse = await axios.get(productsUrl);
    return productsResponse.data.products;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
