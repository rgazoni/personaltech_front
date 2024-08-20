import { Progress } from "@/utils/enums/signup-progress.enum";


export type TProgressActions = {
  type: 'next' | 'previous';
}

export type TUpdateUserActions = {
  type: 'update-user';
  payload: {
    user: TSignupUserInfo;
  }
}
