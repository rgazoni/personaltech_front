import { Progress } from "@/utils/enums/signup-progress.enum";

export type TProgressInitialState = {
  curr_stage: Progress;
  user: TSignupUserInfo;
};

export type TSignupUserInfo = {
  email?: string;
  password?: string;
  cref?: string;
  name?: string;
  type?: string;
}

export type TProgressActions = {
  type: 'next' | 'previous';
}

export type TUpdateUserActions = {
  type: 'update-user';
  payload: {
    user: TSignupUserInfo;
  }
}
