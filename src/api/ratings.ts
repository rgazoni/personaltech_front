import { api } from ".";

type Invite = {
  trainee_id: string;
  personal_id: string;
}

export type Rating = {
  id: string;
  trainee_id: string;
  personal_id: string;
  request: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userResponseAt: Date;
}

export type RatingInfo = {
  full_name: string;
  rating: number;
  avatar: string;
  userResponseAt: Date;
  comment: string;
  trainee_id: string;
}

export type PersonalReqs = {
  id: string;
  full_name: string;
  avatar: string;
}

export type TraineeReqs = {
  id: string;
  page_name: string;
  url: string;
  avatar: string;
}

export const createInvite = async (reqB: Invite): Promise<Rating | string> => {
  try {
    const res = await api.post('ratings/create', reqB);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if ((error as any).response.data.message === 'You are trying to create a resource that already exists.') {
      return 'Você já enviou um convite para este aluno.';
    }
    throw new Error('Erro ao enviar convite. Tente novamente mais tarde.');
  }
}

export const deleteInvite = async (r: Invite): Promise<Rating | string> => {
  const res = await api.delete('ratings/delete', {
    params: {
      trainee_id: r.trainee_id,
      personal_id: r.personal_id,
    },
  });
  return res.data;
};


export const getPersonalReqs = async (token: string): Promise<PersonalReqs[]> => {
  const res = await api.get('ratings/personal?token=' + token);
  console.log(res.data);
  return res.data;
}


export const getTraineeReqs = async (token: string): Promise<TraineeReqs[]> => {
  console.log(token);
  const res = await api.get('ratings/trainee?token=' + token);
  console.log(res.data);
  return res.data;
}

export const getPendingsReqs = async (token: string): Promise<Rating[]> => {
  const res = await api.get('ratings/personal/pending?token=' + token);
  return res.data;
}

export const updateRating = async (r: Partial<Rating>): Promise<Rating> => {
  const res = await api.put('ratings/update', r);
  return res.data;
}

export const updateRequest = async (r: Partial<Rating>): Promise<Rating> => {
  const res = await api.put('ratings/update/request', r);
  return res.data;
}

export const getRatings = async ({ token, status }: { token: string, status: string }): Promise<RatingInfo[]> => {
  const res = await api.get('ratings/info', {
    params: {
      token,
      status,
    },
  });
  return res.data;
}
