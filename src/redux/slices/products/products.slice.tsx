import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getAllProducts } from "./actions/getAllProducts";
import { removeProduct } from "./actions/removeProduct";
import { ProductPayloadProps, createProduct } from "./actions/createProduct";
import { updateProduct } from "./actions/updateProduct";

export interface ProductsState {
  products: string[];
  activeProduct?: ProductPayloadProps;
  error: unknown;
}

const initialState: ProductsState = {
  products: [],
  activeProduct: undefined,
  error: null,
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<string[]>) => {
      state.products = payload;
    },
    setActiveProduct: (
      state,
      { payload }: PayloadAction<ProductPayloadProps | undefined>
    ) => {
      state.activeProduct = payload;
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
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(removeProduct.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
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
export const { setProducts, setActiveProduct } = productsSlice.actions;

export default productsSlice.reducer;
