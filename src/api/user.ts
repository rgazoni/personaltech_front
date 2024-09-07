import { Client, Page, User } from "@/store";
import { api } from ".";
import { getPageById } from "./page";

export type CreateUser = {
  email: string;
  password: string;
  birthdate: Date;
  cref: string;
  type: string;
  state: string;
  city: string;
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
  city: string;
  state: string;
}

export const createUser = async (newUser: CreateUser): Promise<User> => {
  const res = await api.post('personal/create', newUser);
  return res.data;
}

export const createTrainee = async (newClient: CreateClient): Promise<Client> => {
  const res = await api.post('trainee/create', newClient,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data;
}

export const login = async (email: string, password: string, type: 'personal' | 'trainee'): Promise<LoginResponse | Client> => {
  const res = await api.post('auth/login', { email, password, type });
  const user = res.data;
  if (user.role === 'trainee') {
    return {
      ...user,
    };
  }
  const page = await getPageById(res.data.id);
  return {
    role: user.role,
    user: res.data,
    page: page,
  };
}

export const fetchPersonalInfo = async (token: string): Promise<User> => {
  const res = await api.get('personal?token=' + token);
  return res.data;
}

export const fetchTrainees = async (query: string): Promise<Client[]> => {
  const res = await api.get('trainee/q/?query=' + query);
  return res.data;
}

export const updatePassword = async (
  { trainee_id, old_password, new_password }: { trainee_id: string, old_password: string, new_password: string }
): Promise<void> => {
  const res = await api.post('trainee/change/password', { trainee_id, old_password, new_password });
  return res.data;
}

export const updateClientInfo = async ({ id, client }: { id: string, client: Partial<Client> }): Promise<Client> => {
  const res = await api.put(`trainee/${id}`, client);
  return res.data;
}
