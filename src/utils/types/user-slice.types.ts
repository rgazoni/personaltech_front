import { TUser } from "@/@types/user";
import { ErrorToast } from "./error.types";

export type TRequest = {
  loading: boolean;
  error: ErrorToast | null;
};

export type TUserSlice = {
  user: TUser;
  request: TRequest;
};
