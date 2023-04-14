import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  openModal: boolean;
  categories: Array<any>;
}

const initialState: ModalState = {
  openModal: false,
  categories: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModalStatus: (state) => {
      state.openModal = !state.openModal;
    },
    feedInputsOptions: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateModalStatus, feedInputsOptions } = modalSlice.actions;

export default modalSlice.reducer;
