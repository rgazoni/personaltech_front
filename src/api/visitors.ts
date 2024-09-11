import { api } from ".";

export type Visitor = {
  visitor_id?: string;
  visitor_type?: 'personal' | 'trainee' | 'anonymous';
  page_id: string;
  type: 'visit' | 'schedule';
}

export const postVisitor = async (data: Visitor): Promise<any[]> => {
  console.log(data);
  const res = await api.post('visitors/track', data);
  console.log(res.data);
  return res.data;
}
