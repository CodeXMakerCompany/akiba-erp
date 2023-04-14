import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { localBaseUrl } from "../../../constants/endpoints";
import axios from "axios";

export interface ProductsState {
  products: string[];
  error: unknown;
}

const initialState: ProductsState = {
  products: [],
  error: null,
};

export const getAllProducts = createAsyncThunk("product/all", async () => {
  const productsUrl = `${localBaseUrl}/product/all`;
  try {
    const productsResponse = await axios.get(productsUrl);
    return productsResponse.data.products;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<string[]>) => {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
