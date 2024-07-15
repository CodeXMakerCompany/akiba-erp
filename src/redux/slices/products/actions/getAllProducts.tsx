import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { baseURL } from "../../../../api/api";

export const getAllProducts = createAsyncThunk("product/all", async () => {
  const productsUrl = `${baseURL}/product/all`;
  try {
    const productsResponse = await axios.get(productsUrl);
    return productsResponse.data.products;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
