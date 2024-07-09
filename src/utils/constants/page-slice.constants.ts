import { TPageSlice } from "../types/page-slice.types";

export const pageSliceInitialState: TPageSlice = {
  page: {
    page_name: '',
    url: '',
    profession: '',
    service_value: '',
    about_you: '',
    whatsapp: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    presentation_video: '',
  },
  request: {
    loading: false,
    error: null,
  },
};

