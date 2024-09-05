import { Client, Page, User } from "@/store";
import { api } from ".";
import { getPageByToken } from "./page";

export type CreateUser = {
  email: string;
  password: string;
  birthdate: Date;
  cref: string;
  type: string;
};

export type LoginResponse = {
  user: User;
  page: Page;
  role: string;
}

export type CreateClient = {
  email: string;
  password: string;
  birthdate: Date;
  full_name: string;
  avatar: File;
}

export const createUser = async (newUser: CreateUser): Promise<User> => {
  const res = await api.post('user/create', newUser);
  return res.data;
}

export const createClient = async (newClient: CreateClient): Promise<Client> => {
  console.log(newClient);
  const res = await api.post('user/signup-client', newClient,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data;
}

export const login = async (email: string, password: string): Promise<LoginResponse | Client> => {
  const res = await api.post('auth/login', { email, password });
  const user = res.data;
  if (user.role === 'client') {
    return {
      ...user,
    };
  }
  const page = await getPageByToken(res.data.token);
  return {
    role: user.role,
    user: res.data,
    page: page,
  };
}

export const fetchUserInfo = async (token: string): Promise<User> => {
  const res = await api.get('user?token=' + token);
  return res.data;
}

export const fetchClients = async (query: string): Promise<Client[]> => {
  const res = await api.get('user/cl?q=' + query);
  return res.data;
}
