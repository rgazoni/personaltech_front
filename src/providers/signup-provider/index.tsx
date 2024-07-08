import { Dispatch, PropsWithChildren, useReducer } from 'react';
import { createContext } from '..';
import { progressReducer } from '@/reducers/signup-progress';
import { initialState } from '@/utils/constants/signup-process.constants';
import { TProgressActions, TProgressInitialState, TUpdateUserActions } from '@/utils/types/signup-process-reducer.types';

const [useContext, Provider] = createContext<{
  state: TProgressInitialState;
  dispatch: Dispatch<
    TProgressActions | TUpdateUserActions
  >;
}>();

export const useProgressContext = useContext;

export const ProgressProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
