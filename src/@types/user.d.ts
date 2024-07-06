export type TUser = {
  token?: string;
  id?: string;
  email: string;
  cref: string;
  is_cref_verified?: boolean;
  type: string;
}
