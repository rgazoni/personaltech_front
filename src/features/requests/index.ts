import { createSlice } from "@reduxjs/toolkit";
import { fetchCref } from "./http";

type TRequestState = {
  loading: boolean;
  error: string | undefined;
}

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    loading: false,
    error: undefined,
  } as TRequestState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCref.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCref.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCref.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default requestsSlice.reducer;
