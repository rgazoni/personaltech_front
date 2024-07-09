import { TUserSlice } from "../types/user-slice.types";

export const userSliceInitialState: TUserSlice = {
  user: {
    is_authenticated: false,
    email: '',
    cref: '',
    type: '',
  },
  request: {
    loading: false,
    error: null,
  },
};

