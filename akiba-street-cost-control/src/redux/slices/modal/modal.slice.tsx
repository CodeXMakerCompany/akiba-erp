import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  openModal: boolean;
  mode: string | undefined;
  categories: Array<any>;
  dateSelection: any;
  selectedId: string | undefined;
  entity: string | undefined;
}

interface ModalStatusPayloadInterface {
  id?: string;
  entity?: string;
  mode?: string;
}

const initialState: ModalState = {
  openModal: false,
  mode: "Create",
  categories: [],
  dateSelection: null,
  selectedId: undefined,
  entity: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
    updateModalStatus: (
      state,
      action: PayloadAction<ModalStatusPayloadInterface | undefined>
    ) => {
      const { id, entity, mode } = action.payload || {};

      state.openModal = !state.openModal;
      state.selectedId = id;
      state.entity = entity;
      state.mode = mode;
    },
    feedInputsOptions: (state, { payload }) => {
      state.categories = payload;
    },
    feedDateSelection: (state, { payload }) => {
      state.dateSelection = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMode,
  updateModalStatus,
  feedInputsOptions,
  feedDateSelection,
} = modalSlice.actions;

export default modalSlice.reducer;
