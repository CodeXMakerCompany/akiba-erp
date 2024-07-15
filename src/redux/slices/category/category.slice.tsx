import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "./acions/getCategories";

export interface CategoryState {
  categories: Array<any>;
  selectedCategory: any;
  openModal: boolean;
  loading: boolean;
  error : string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  openModal: false,
  loading : true,
  error : null
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateModalStatus: (state) => {
      state.openModal = !state.openModal;
    },
    setCategories: (state, action: PayloadAction<Array<any>>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateModalStatus, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
