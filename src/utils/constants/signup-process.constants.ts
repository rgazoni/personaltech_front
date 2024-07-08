import { Progress } from "../enums";
import { TProgressInitialState } from "../types/signup-process-reducer.types";

export const stageOrder = [
  Progress.SIGNIN_INFO,
  Progress.LISENSE_INFO,
  Progress.PAGE_INFO,
];

export const initialState: TProgressInitialState = {
  curr_stage: stageOrder[0],
  user: {
    email: '',
    password: '',
    cref: '',
    type: '',
    name: '',
  },
};
