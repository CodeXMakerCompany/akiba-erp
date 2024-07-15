import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllProducts } from "./getAllProducts";
import { enqueueSnackbar } from "notistack";
import { updateModalStatus } from "../../modal/modal.slice";
import { ProductPayloadProps } from "./createProduct";
import { baseURL } from "../../../../api/api";

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (productPayload: ProductPayloadProps, { dispatch }) => {
    const productsUrl = `${baseURL}/product/update`;

    try {
      const productsResponse = await axios.put(productsUrl, productPayload);
      const message = productsResponse.data.model;
      if (message === "Product udpated") {
        await dispatch(getAllProducts());
        enqueueSnackbar(message, { variant: "success" });
        dispatch(updateModalStatus());
      }

      return productsResponse.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
