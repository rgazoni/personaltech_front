import { Dispatch, PropsWithChildren, useReducer } from 'react';
import { createContext } from '..';
import {
  ActionsEditPersonal,
  TEditPersonalPageForm,
  editPersonalPageFormReducer,
  initEditReducer,
} from '@/reducers/edit-personal-page';

const [useContext, Provider] = createContext<{
  state: TEditPersonalPageForm;
  dispatch: Dispatch<ActionsEditPersonal>;
}>();

export const useEditPersonalContext = useContext;

export const EditPersonalProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    editPersonalPageFormReducer,
    initEditReducer()
  );
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
