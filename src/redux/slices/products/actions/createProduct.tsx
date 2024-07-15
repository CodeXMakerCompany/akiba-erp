import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { getAllProducts } from "./getAllProducts";
import { enqueueSnackbar } from "notistack";
import { updateModalStatus } from "../../modal/modal.slice";
import { baseURL } from "../../../../api/api";

export interface PresaleProductProps {
  initialPayment?: number
  launchDate?: Date
}

export interface ProductPayloadProps extends PresaleProductProps{
  _id?: string;
  category: string;
  subcategory: string;
  image: string;
  stock: number;
  name: string;
  customerPrice: number;
  purchasePrice: number;
}

export const createProduct = createAsyncThunk(
  "createProduct",
  async (productPayload: ProductPayloadProps, { dispatch }) => {
    const productsUrl = `${baseURL}/product/create`;

    try {
      const productsResponse = await axios.post(productsUrl, productPayload);
      const message = productsResponse.data.model;
      if (message === "Product created") {
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
