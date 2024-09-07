import { api } from ".";

export type CrefStatusResponse = {
  status: 'valid' | 'invalid' | 'pending';
  name?: string;
};

export const fetchCrefStatus = async (cref: string): Promise<CrefStatusResponse> => {
  const res = await api.get(`personal/cref/status?cref=${cref}`);
  return res.data;
}
