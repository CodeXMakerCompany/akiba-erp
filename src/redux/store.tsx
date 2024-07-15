import { configureStore } from "@reduxjs/toolkit";
import category from "./slices/category/category.slice";
import modal from "./slices/modal/modal.slice";
import upload from "./slices/uploads/uploads.slice";
import product from "./slices/products/products.slice";
import sales from "./slices/sales/sales.slice";
import events from "./slices/events/events.slice";
import auction from "./slices/auction/auction.slice";

export const store = configureStore({
  reducer: {
    category,
    modal,
    upload,
    product,
    sales,
    events,
    auction
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
