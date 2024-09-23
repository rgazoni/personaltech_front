import { api } from ".";

type Invite = {
  trainee_id: string;
  personal_id: string;
}

export type Classes = {
  id: string;
  trainee_id: string;
  personal_id: string;
  elapsed_time: number;
  status: string;
  createdAt: Date;
  updateAt: Date;
}

export type PersonalClasses = {
  class_id: string;
  id: string;
  full_name: string;
  avatar: string;
}

export type PersonalInfo = {
  class_id: string;
  id: string;
  page_name: string;
  url: string;
  avatar: string;
}


export const createClass = async (reqB: Invite): Promise<Classes | string> => {
  try {
    const res = await api.post('classes/create', reqB);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'Erro ao enviar convite. Tente novamente mais tarde.';
  }
}

export const getPersonalClasses = async (token: string): Promise<PersonalClasses[]> => {
  console.log('token', token);
  const res = await api.get('classes/personal?token=' + token);
  console.log(res.data);
  return res.data;
}

export const getTraineeClasses = async (token: string): Promise<PersonalInfo[]> => {
  const res = await api.get('classes/trainee?token=' + token);
  return res.data;
}

export const getTraineeResponses = async (id: string, status: string): Promise<any[]> => {
  const res = await api.get('classes/trainee/responses?id=' + id + '&status=' + status);
  return res.data;
}

export const deleteClass = async (r: { class_id: string }): Promise<Classes | string> => {
  const res = await api.delete('classes/delete', {
    params: {
      class_id: r.class_id,
    },
  });
  return res.data;
};

export const updateClass = async (r: Partial<Classes>): Promise<Classes> => {
  const res = await api.put('classes/update', r);
  return res.data;
}

