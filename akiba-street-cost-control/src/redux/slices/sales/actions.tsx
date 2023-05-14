import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../../api/api";

const api = apiInstance();

interface createSaleRequest {}

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  // if you type your function argument here
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await api.post("/sales/all", { page, limit });
    return await response;
  }
);

export const createSale = createAsyncThunk(
  "sales/createSale",
  // if you type your function argument here
  async (body: createSaleRequest, { dispatch }) => {
    const response = await api.post("/sales/create", body);

    if (response) {
      await dispatch(fetchSales({ page: 1, limit: 10 }) as any);
    }
    return response;
  }
);
