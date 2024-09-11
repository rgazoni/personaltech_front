import { api } from ".";

export type CrefStatusResponse = {
  status: 'valid' | 'invalid' | 'pending';
  name?: string;
};

export const fetchCrefStatus = async (id: { id: string }): Promise<CrefStatusResponse> => {
  const res = await api.get(`personal/cref/status?id=${id.id}`);
  return res.data;
}

export const fetchCrefRenew = async (data: { cref: string, type: string, personal_id: string }): Promise<CrefStatusResponse> => {
  const res = await api.put(`personal/cref/renew`, data);
  return res.data;
}
