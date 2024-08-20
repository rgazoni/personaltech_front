import { api } from ".";

export type CrefStatusResponse = {
  status: 'valid' | 'invalid' | 'already_registered' | 'pending';
  name?: string;
};

export const fetchCrefStatus = async (cref: string): Promise<CrefStatusResponse> => {
  const res = await api.get(`user/cref/status?cref=${cref}`);
  return res.data;
}
