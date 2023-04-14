import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  categories: Array<any>;
  selectedCategory: any;
  openModal: boolean;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  openModal: false,
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
});

// Action creators are generated for each case reducer function
export const { updateModalStatus, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
