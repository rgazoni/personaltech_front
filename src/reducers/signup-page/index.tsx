import { pageNameInitState } from '@/utils/constants/signup-page-reducer.constants';
import { TTriggerUrlSuggestion, TUpdatePageActions } from '@/utils/types/signup-page-reducer.types';
import { produce } from 'immer';

const RANDOM_NUMBER = Math.floor(Math.random() * 10000);

export const signupPageReducer =
  (
    state = pageNameInitState,
    action: TUpdatePageActions | TTriggerUrlSuggestion
  ) => {
    switch (action.type) {
      case 'update-page-name':
        return produce(state, (draft) => {
          draft.page_name = action.payload;
        });
      case 'trigger-url-suggestion':
        return produce(state, (draft) => {
          if (draft.page_name.length)
            draft.url = draft.page_name.toLowerCase().replace(' ', '-') + '-' + RANDOM_NUMBER;
        });
      case 'update-page-url':
        return produce(state, (draft) => {
          draft.url = action.payload;
        });
      default:
        return state;
    }
  };
