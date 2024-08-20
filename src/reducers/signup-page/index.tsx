import { pageNameInitState } from '@/utils/constants/signup-page-reducer.constants';
import { produce } from 'immer';
import { SignupPageActions } from './signup-page.types';

const RANDOM_NUMBER = Math.floor(Math.random() * 10000);

export const signupPageReducer =
  (
    state = pageNameInitState,
    action: SignupPageActions
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
