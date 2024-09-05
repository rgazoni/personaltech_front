import { Progress } from "./progress.enums";

export const stageOrder = [
  Progress.SIGNIN_INFO,
  Progress.LISENSE_INFO,
  Progress.PAGE_INFO,
];

export const initialState = {
  curr_stage: stageOrder[0],
  user: {
    email: '',
    password: '',
    birthdate: '',
    cref: '',
    type: '',
    name: '',
  },
};
