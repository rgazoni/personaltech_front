import { TUrlAvailability } from '@/@types/page';
import { ErrorToast } from '@/utils/types/error.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/';
const requestOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json', // Specify content type
  },
};

export const urlAvailabilityPage = createAsyncThunk<
  { url: string; status: string },
  TUrlAvailability,
  {
    rejectValue: ErrorToast;
  }>
  (
    'page/urlAvailability',
    async (page_url: TUrlAvailability, thunkAPI) => {
      const rejectWithValue = thunkAPI.rejectWithValue;
      const response = await fetch(url + `pages/verify/url?url=${page_url.page_url}`, {
        method: 'GET', // HTTP method
        ...requestOptions,
      });

      if (!response.ok) {
        const payload: ErrorToast = {
          title: 'Erro no cadastro',
          text: 'Ocorreu um erro inesperado, tente novamente mais tarde',
        };
        return rejectWithValue(payload);
      }
      const data: {
        url: string;
        status: string;
      } = await response.json();
      return data;
    }
  );
