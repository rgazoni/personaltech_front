import { TCreatePage } from '@/@types/page';
import { ErrorToast } from '@/utils/types/error.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/';
const requestOptions: RequestInit = {
  method: 'POST', // HTTP method
  headers: {
    'Content-Type': 'application/json', // Specify content type
  },
};

export const createPage = createAsyncThunk<
  TCreatePage,
  TCreatePage,
  {
    rejectValue: ErrorToast;
  }
>(
  'page/createPage',
  async (page: TCreatePage, thunkAPI) => {
    const rejectWithValue = thunkAPI.rejectWithValue;
    const response = await fetch(url + 'pages/create', {
      ...requestOptions,
      body: JSON.stringify(page),
    });

    if (!response.ok) {
      if (response.status === 409) {
        const error = await response.json();
        console.log(error);
        const payload: ErrorToast = {
          title: 'Erro no cadastro',
          text: `A ${error.meta.target[0]} escolhida já está em uso`,
        };
        return rejectWithValue(payload);
      }
      else {
        const payload: ErrorToast = {
          title: 'Erro no cadastro',
          text: 'Ocorreu um erro inesperado, tente novamente mais tarde',
        };
        return rejectWithValue(payload);
      }
    }
    const data = await response.json();
    return data;
  }
);
