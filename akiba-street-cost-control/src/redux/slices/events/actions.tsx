import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../../api/api";

const api = apiInstance();

interface createSaleRequest {}

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  // if you type your function argument here
  async () => {
    const response = await api.get("/event/all");
    return response;
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  // if you type your function argument here
  async (body: createSaleRequest, { dispatch }) => {
    const response = await api.post("/event/create", body);

    if (response.status === 200) {
      await dispatch(fetchEvents() as any);
    }
    return response;
  }
);
