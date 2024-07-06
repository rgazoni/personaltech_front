import { ErrorToast } from '@/utils/types/error.types';
import { TSignupUserInfo } from '@/utils/types/signup-process.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/';
const requestOptions: RequestInit = {
  method: 'POST', // HTTP method
  headers: {
    'Content-Type': 'application/json', // Specify content type
  },
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: TSignupUserInfo, thunkAPI) => {
    const rejectWithValue = thunkAPI.rejectWithValue;
    const response = await fetch(url + 'users/create', {
      ...requestOptions,
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      if (response.status === 409) {
        const error = await response.json();
        const payload: ErrorToast = {
          title: 'Erro no cadastro',
          text: `O ${error.meta.target[0]} utilizado já está cadastrado`,
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
