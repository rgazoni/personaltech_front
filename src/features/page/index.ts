import { createSlice } from '@reduxjs/toolkit';
import { ErrorToast } from '@/utils/types/error.types';
import { urlAvailabilityPage } from './url-availability-page';
import { pageSliceInitialState } from '@/utils/constants/page-slice.constants';
import { createPage } from './create-page';

export const pageSlice = createSlice({
  name: 'page',
  initialState: pageSliceInitialState,
  reducers: {
    updatePageName: (state, action) => {
      if (action.payload.page_name)
        state.page.page_name = action.payload.page_name;
    },
    updateProfession: (state, action) => {
      if (action.payload.profession)
        state.page.profession = action.payload.profession;
    },
    updateServiceValue: (state, action) => {
      if (action.payload.service_value)
        state.page.service_value = action.payload.service_value;
    },
    updateAboutYou: (state, action) => {
      if (action.payload.about_you)
        state.page.about_you = action.payload.about_you;
    },
    updateWhatsapp: (state, action) => {
      if (action.payload.whatsapp)
        state.page.whatsapp = action.payload.whatsapp;
    },
    updateInstagram: (state, action) => {
      if (action.payload.instagram)
        state.page.instagram = action.payload.instagram;
    },
    updateTiktok: (state, action) => {
      if (action.payload.tiktok) state.page.tiktok = action.payload.tiktok;
    },
    updateYoutube: (state, action) => {
      if (action.payload.youtube) state.page.youtube = action.payload.youtube;
    },
    updatePresentationVideo: (state, action) => {
      if (action.payload.presentation_video)
        state.page.presentation_video = action.payload.presentation_video;
    },
    updateAllFields: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPage.pending, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.request.loading = false;
        state.page.url = action.payload.url;
        state.page.page_name = action.payload.page_name;
      })
      .addCase(createPage.rejected, (state, action) => {
        state.request.loading = false;
        state.request.error = action.payload ?? {
          title: 'Erro no cadastro',
          text: 'Ocorreu um erro inesperado, tente novamente mais tarde',
        };
      })
      //URL AVAILABILITY REQUEST
      .addCase(urlAvailabilityPage.pending, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(urlAvailabilityPage.fulfilled, (state, action) => {
        state.request.loading = false;
        if (action.payload.status === 'available') {
          state.page.url = action.payload.url;
        }
      })
      .addCase(urlAvailabilityPage.rejected, (state, action) => {
        state.request.loading = false;
        state.request.error = action.payload as ErrorToast;
      });
  },
});

export default pageSlice.reducer;
