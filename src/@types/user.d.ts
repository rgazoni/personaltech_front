export type TUser = {
  is_authenticated: boolean;
  token?: string;
  id?: string;
  email: string;
  cref: string;
  is_cref_verified?: boolean;
  type: string;
  name?: string;
}
