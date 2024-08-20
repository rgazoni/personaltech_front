import { User } from "@/store";
import { api } from ".";

export type CreateUser = {
  email: string;
  password: string;
  cref: string;
  type: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export const createUser = async (newUser: CreateUser): Promise<User> => {
  const res = await api.post('user/create', newUser);
  return res.data;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await api.post('auth/login', { email, password });
  return res.data;
}
