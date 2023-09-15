import { createAsyncThunk } from "@reduxjs/toolkit";
import { localBaseUrl } from "../../../../constants/endpoints";
import axios from "axios";
import { getAllProducts } from "./getAllProducts";
import { enqueueSnackbar } from "notistack";

export const removeProduct = createAsyncThunk(
  "removeProduct",
  async (id: string, { dispatch }) => {
    const productsUrl = `${localBaseUrl}/product/delete/${id}`;

    try {
      const productsResponse = await axios.delete(productsUrl);
      const message = productsResponse.data.message;
      if (message === "Product removed") {
        await dispatch(getAllProducts());
        enqueueSnackbar(message, { variant: "success" });
      }

      return productsResponse.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
