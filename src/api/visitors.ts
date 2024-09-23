import { Age } from "@/pages/private/edit-personal-page/dashboard";
import { api } from ".";

export type Visitor = {
  visitor_id?: string;
  visitor_type?: 'personal' | 'trainee' | 'anonymous';
  page_id: string;
  type: 'visit' | 'schedule';
}

export type Gender = {
  gender: string;
  count: number;
  abrv: string;
}

export const postVisitor = async (data: Visitor): Promise<any[]> => {
  console.log(data);
  const res = await api.post('visitors/track', data);
  console.log(res.data);
  return res.data;
}

export const getWeekly = async (page_id: string): Promise<any[]> => {
  const res = await api.get(`visitors/${page_id}`,);
  console.log(res.data);
  return res.data;
}

export const getAge = async (page_id: string): Promise<Age> => {
  const res = await api.get(`visitors/age/${page_id}`);
  console.log(res.data);
  return res.data;
}

export const getGender = async (page_id: string): Promise<Gender> => {
  const res = await api.get(`visitors/gender/${page_id}`);
  console.log(res.data);
  return res.data;
}

export const getRegions = async (page_id: string): Promise<{ city: string, state: string, count: number }[]> => {
  const res = await api.get(`visitors/regions/${page_id}`);
  console.log(res.data);
  return res.data;
}

export const getElapsedTime = async (page_id: string): Promise<{ elapsed_time: number }> => {
  const res = await api.get(`visitors/hours/${page_id}`);
  console.log(res.data);
  return res.data;
}
