import { createSlice } from "@reduxjs/toolkit";
import { createEvent, fetchEvents } from "./actions";

export interface EventsState {
  events: Array<any>;
  isLoading: boolean;
  error: boolean;
}

const initialState: EventsState = {
  events: [],
  isLoading: false,
  error: false,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state, action) => {
      state.isLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.error = true;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.isLoading = false;

      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });

    builder.addCase(fetchEvents.pending, (state, action) => {
      state.isLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.error = false;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.events = payload?.data?.events;
      // state.events = payload?.events;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = eventsSlice.actions;

export default eventsSlice.reducer;
