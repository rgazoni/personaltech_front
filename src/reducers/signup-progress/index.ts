import {
  initialState,
  stageOrder,
} from '@/utils/constants/signup-process.constants';
import {
  TProgressActions,
  TUpdateUserActions,
} from '@/utils/types/signup-process-reducer.types';
import { produce } from 'immer';

export const progressReducer = (
  state = initialState,
  action: TProgressActions | TUpdateUserActions
) => {
  switch (action.type) {
    case 'next':
      return produce(state, (draft) => {
        if (stageOrder.indexOf(draft.curr_stage) < stageOrder.length - 1)
          draft.curr_stage =
            stageOrder[stageOrder.indexOf(draft.curr_stage) + 1];
      });
    case 'previous':
      return produce(state, (draft) => {
        if (stageOrder.indexOf(draft.curr_stage) >= 0)
          draft.curr_stage =
            stageOrder[stageOrder.indexOf(draft.curr_stage) - 1];
      });
    case 'update-user':
      return produce(state, (draft) => {
        draft.user = action.payload.user;
      });
    default:
      return state;
  }
};
