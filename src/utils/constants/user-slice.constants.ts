import { TUserSlice } from "../types/user-slice.types";

export const userSliceInitialState: TUserSlice = {
  user: {
    email: '',
    cref: '',
    type: '',
  },
  request: {
    loading: false,
    error: null,
  },
};

