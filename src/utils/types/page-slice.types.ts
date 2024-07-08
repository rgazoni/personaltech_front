import { ErrorToast } from "./error.types";

export type TRequest = {
  loading: boolean;
  error: ErrorToast | null;
};

export type TPage = {
  url: string;
  page_name: string;
}

export type TPageSlice = {
  page: TPage;
  request: TRequest;
};
