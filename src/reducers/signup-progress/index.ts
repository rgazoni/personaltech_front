import { produce } from 'immer';
import { initialState, stageOrder } from './progress.constants';
import { ProgressActions, UpdateUserActions } from './progress.types';

export const progressReducer = (
  state = initialState,
  action: ProgressActions | UpdateUserActions
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
        draft.user = {
          ...draft.user,
          ...action.payload.user,
        }
      });
    default:
      return state;
  }
};
