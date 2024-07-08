import { TPageSlice } from "../types/page-slice.types";

export const pageSliceInitialState: TPageSlice = {
  page: {
    page_name: '',
    url: '',
  },
  request: {
    loading: false,
    error: null,
  },
};

