import { Progress } from "@/utils/enums/signup-progress.enum";

const stageOrder = [
  Progress.SIGNIN_INFO,
  Progress.PERSONAL_INFO,
  Progress.PAGE_INFO,
];

export type TProgressInitialState = {
  curr_stage: Progress;
};

export const initialState: TProgressInitialState = {
  curr_stage: Progress.SIGNIN_INFO,
};

export type TProgressActions = {
  type: 'next' | 'previous';
}

export const progressReducer = (state = initialState, action: TProgressActions) => {
  switch (action.type) {
    case 'next':
      if (stageOrder.indexOf(state.curr_stage) < stageOrder.length - 1)
        return {
          curr_stage: stageOrder[stageOrder.indexOf(state.curr_stage) + 1],
        };
      return state;
    case 'previous':
      if (stageOrder.indexOf(state.curr_stage) >= 0)
        return {
          curr_stage: stageOrder[stageOrder.indexOf(state.curr_stage) - 1],
        };
      return state;
    default:
      return state;
  }
};
