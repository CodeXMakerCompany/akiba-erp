import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UploadState {
  mediaPreview: string;
}

const initialState: UploadState = {
  mediaPreview: "",
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setMediaPreview: (state, { payload }: PayloadAction<string>) => {
      state.mediaPreview = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMediaPreview } = uploadSlice.actions;

export default uploadSlice.reducer;
