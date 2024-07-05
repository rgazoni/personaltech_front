import { Progress } from "@/utils/enums/signup-progress.enum";

export type TProgressInitialState = {
  curr_stage: Progress;
  user: TSignupUserInfo;
  page: TSignupPageInfo;
};

export type TSignupUserInfo = {
  email?: string;
  password?: string;
  cref?: string;
  name?: string;
}

export type TSignupPageInfo = {
  user_id: string;
  url: string;
  page_name: string;
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

export type TUpdatePageActions = {
  type: 'update-page';
  payload: {
    page: TSignupPageInfo;
  }
}
