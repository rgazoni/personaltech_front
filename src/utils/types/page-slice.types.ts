import { ErrorToast } from './error.types';

export type TRequest = {
  loading: boolean;
  error: ErrorToast | null;
};

export type TPage = {
  url: string;
  page_name: string;
  profession: string;
  service_value: string;
  about_you: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  presentation_video: string;
  header_color: string;
  profile_picture: string;
};

export type TPageSlice = {
  page: TPage;
  request: TRequest;
};
