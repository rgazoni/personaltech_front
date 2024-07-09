import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./create-user";
import { userSliceInitialState } from "@/utils/constants/user-slice.constants";
import { ErrorToast } from "@/utils/types/error.types";

const userSlice = createSlice({
  name: 'user',
  initialState: userSliceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.request.loading = false;
        state.user = {
          is_authenticated: true,
          ...action.payload,
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        state.request.loading = false;
        //TODO: this return needs to be better type safe
        state.request.error = action.payload as ErrorToast;
      });
  },
});

export default userSlice.reducer;
