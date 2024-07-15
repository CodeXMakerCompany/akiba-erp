import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { updateModalStatus } from "../../modal/modal.slice";
import apiInstance from "../../../../api/api";
import { getCategories } from "./getCategories";

const api = apiInstance()

export interface CategoryPayloadProps {
  name: string;
}

export const createCategory = createAsyncThunk(
  "createCategory",
  async (productPayload: CategoryPayloadProps, { dispatch }) => {
    const categoryUrl = `/category/create`;

    try {
      const categoryResponse = await api.post(categoryUrl, productPayload);
      const message = categoryResponse.data.model;
      if (message === "Category" && categoryResponse.data.createdItem) {
        await dispatch(getCategories());
        enqueueSnackbar(message, { variant: "success" });
        dispatch(updateModalStatus());
      }

      return categoryResponse.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
