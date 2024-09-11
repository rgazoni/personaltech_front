import useAppStore, { Page } from '@/store';
import { api } from '.';

export type UrlAvailabilityResponse = {
  url: string;
  status: 'available' | 'unavailable';
};

export type CreatePage = {
  personal_id: string;
  page_name: string;
  url: string;
};

export type UpdatePage = Partial<Page>;

export const urlAvailabilityPage = async (
  page_url: string
): Promise<UrlAvailabilityResponse> => {
  const res = await api.get(`pages/verify/url?url=${page_url}`);
  return res.data;
};

export const createPage = async (page: CreatePage): Promise<CreatePage> => {
  const res = await api.post('pages/create', page);
  return res.data;
};

export const updatePage = async (page: UpdatePage): Promise<Page> => {
  const user = useAppStore.getState().user;
  const res = await api.put(
    'pages/update',
    {
      token: user.id,
      ...page,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data;
};

export type GetPage = Page & {
  id: string;
  uid_chat: string;
  city: string;
  state: string;
  ratings: {
    total: number;
    average: number;
  };
};

export const getPage = async (page_url: string): Promise<GetPage> => {
  const res = await api.get(`pages/${page_url}`);
  return res.data;
};

export const getPageById = async (token: string): Promise<Page> => {
  const res = await api.get(`pages/id/${token}`);
  return res.data;
};

export const fetchTrainers = async (): Promise<GetPage[]> => {
  const res = await api.get('pages');
  return res.data;
};

export const fetchPersonalSearch = async (
  expertises?: string[],
  name?: string,
  state?: string,
  city?: string,
  rate?: string,
  gender?: string
): Promise<GetPage[]> => {
  const query = new URLSearchParams();
  if (expertises && expertises.length > 0) {
    query.append('expertises', expertises.join(','));
  }
  if (name && name.length > 0) {
    query.append('name', name);
  }
  if (state && state.length > 0 && city && city.length > 0) {
    query.append('state', state);
    query.append('city', city);
  }
  if (rate && rate.length > 0) {
    query.append('rate', rate);
  }
  if (gender && gender.length > 0) {
    query.append('gender', gender.includes('M') ? 'M' : 'F')
  }

  console.log(query.toString());

  const res = await api.get(`pages/search?${query.toString()}`);
  return res.data;
};

export const updateCommentsSort = async (sort: { personal_id: string, comments_sort: string }): Promise<CreatePage> => {
  const res = await api.put('pages/rate/sort', sort);
  return res.data;
};
