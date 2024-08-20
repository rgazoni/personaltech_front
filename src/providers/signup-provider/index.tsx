import { Dispatch, PropsWithChildren, useReducer } from 'react';
import { createContext } from '..';
import { progressReducer } from '@/reducers/signup-progress';
import { initialState } from '@/utils/constants/signup-process.constants';
import { ProgressActions, UpdateUserActions } from '@/reducers/signup-progress/progress.types';

const [useContext, Provider] = createContext<{
  state: typeof initialState;
  dispatch: Dispatch<
    ProgressActions | UpdateUserActions
  >;
}>();

export const useProgressContext = useContext;

export const ProgressProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
