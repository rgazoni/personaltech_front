import { createSlice } from '@reduxjs/toolkit';
import { ErrorToast } from '@/utils/types/error.types';
import { urlAvailabilityPage } from './url-availability-page';
import { pageSliceInitialState } from '@/utils/constants/page-slice.constants';
import { createPage } from './create-page';

const pageSlice = createSlice({
  name: 'page',
  initialState: pageSliceInitialState,
  reducers: {},
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
