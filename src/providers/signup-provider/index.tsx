import { Dispatch, PropsWithChildren, useReducer } from 'react';
import { createContext } from '..';
import {
  TProgressActions,
  TProgressInitialState,
  initialState,
  progressReducer,
} from '@/reducers/signup-progress';

const [useContext, Provider] = createContext<{
  state: TProgressInitialState;
  dispatch: Dispatch<TProgressActions>;
}>();

export const useProgressContext = useContext;

export const ProgressProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
