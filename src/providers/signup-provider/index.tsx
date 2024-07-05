import { Dispatch, PropsWithChildren, useReducer } from 'react';
import { createContext } from '..';
import { progressReducer } from '@/reducers/signup-progress';
import {
  TProgressActions,
  TProgressInitialState,
  TUpdatePageActions,
  TUpdateUserActions,
} from '@/utils/types/signup-process.types';
import { initialState } from '@/utils/constants/signup-process.constants';

const [useContext, Provider] = createContext<{
  state: TProgressInitialState;
  dispatch: Dispatch<
    TProgressActions | TUpdateUserActions | TUpdatePageActions
  >;
}>();

export const useProgressContext = useContext;

export const ProgressProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
