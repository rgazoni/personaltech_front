import { useAppSelector } from '@/features/store';
import { produce } from 'immer';

export const initEditReducer = () => {
  const { page } = useAppSelector((state) => state.page);
  console.log('aqui', page)
  return {
    page_name: page.page_name,
    profession: page.profession,
    service_value: page.service_value,
    about_you: page.about_you,
    whatsapp: page.whatsapp,
    instagram: page.instagram,
    tiktok: page.tiktok,
    youtube: page.youtube,
    presentation_video: page.presentation_video
  };
}

export type TEditPersonalPageForm = {
  page_name: string;
  profession: string;
  service_value: string;
  about_you: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  presentation_video: string;
}

export type TEditPersonalPageFormPartial = Partial<
  TEditPersonalPageForm
>;

export type TEditPersonalPageFormActions = {
  type:
  | 'update-page_name'
  | 'update-profession'
  | 'update-service_value'
  | 'update-about_you'
  | 'update-whatsapp'
  | 'update-instagram'
  | 'update-tiktok'
  | 'update-youtube'
  | 'update-presentation_video';
  payload: Partial<TEditPersonalPageFormPartial>;
};

export type TEditPersonalPageFormAllFieldsAction = {
  type: 'update-all-fields';
  payload: TEditPersonalPageForm
}

export const editPersonalPageFormReducer = (
  state = initEditReducer(),
  action: TEditPersonalPageFormActions | TEditPersonalPageFormAllFieldsAction
) => {
  switch (action.type) {
    case 'update-page_name':
      return produce(state, (draft) => {
        if (action.payload.page_name)
          draft.page_name = action.payload.page_name;
      });
    case 'update-profession':
      return produce(state, (draft) => {
        if (action.payload.profession)
          draft.profession = action.payload.profession;
      });
    case 'update-service_value':
      return produce(state, (draft) => {
        if (action.payload.service_value)
          draft.service_value = action.payload.service_value;
      });
    case 'update-about_you':
      return produce(state, (draft) => {
        if (action.payload.about_you)
          draft.about_you = action.payload.about_you;
      });
    case 'update-whatsapp':
      return produce(state, (draft) => {
        if (action.payload.whatsapp)
          draft.whatsapp = action.payload.whatsapp;
      });
    case 'update-instagram':
      return produce(state, (draft) => {
        if (action.payload.instagram)
          draft.instagram = action.payload.instagram;
      });
    case 'update-tiktok':
      return produce(state, (draft) => {
        if (action.payload.tiktok)
          draft.tiktok = action.payload.tiktok;
      });
    case 'update-youtube':
      return produce(state, (draft) => {
        if (action.payload.youtube)
          draft.youtube = action.payload.youtube;
      });
    case 'update-presentation_video':
      return produce(state, (draft) => {
        if (action.payload.presentation_video)
          draft.presentation_video = action.payload.presentation_video;
      });
    case 'update-all-fields':
      return produce(state, (draft) => {
        draft = action.payload;
      })
    default:
      return state;
  }
};
