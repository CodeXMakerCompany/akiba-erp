import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../../../api/api";
import { defaultSuccessApiCallMessage } from "../../../constants";

const api = apiInstance()

export interface CategoryPayloadProps {
  name: string;
}

export const getCategories = createAsyncThunk(
  "getCategories",
  async (_params, { dispatch }) => {
    const categoryUrl = `/category/all`;
    try {
      const categoryResponse = await api.get(categoryUrl);
      if (categoryResponse.data.status === defaultSuccessApiCallMessage) {
        return categoryResponse.data.categories;
      }

      return categoryResponse.data.categories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
