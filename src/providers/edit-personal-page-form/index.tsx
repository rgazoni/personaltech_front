import { Dispatch, PropsWithChildren, useReducer } from 'react';
import { createContext } from '..';
import {
  TEditPersonalPageForm,
  TEditPersonalPageFormActions,
  editPersonalPageFormInitValue,
  editPersonalPageFormReducer,
} from '@/reducers/edit-personal-page-form';
import { useAppSelector } from '@/features/store';

const [useContext, Provider] = createContext<{
  state: TEditPersonalPageForm;
  dispatch: Dispatch<TEditPersonalPageFormActions>;
}>();

export const useEditPersonalPageFormContext = useContext;

export const EditPersonalPageFormProvider = ({ children }: PropsWithChildren) => {
  const { page } = useAppSelector((state) => state.page);

  //TODO: Put initial values here
  editPersonalPageFormInitValue.page_name = page.page_name;

  const [state, dispatch] = useReducer(
    editPersonalPageFormReducer,
    editPersonalPageFormInitValue
  );
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
