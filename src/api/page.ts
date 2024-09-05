import useAppStore, { Page } from "@/store";
import { api } from ".";

export type UrlAvailabilityResponse = {
  url: string;
  status: 'available' | 'unavailable';
};

export type CreatePage = {
  user_id: string;
  page_name: string;
  url: string;
}

export type UpdatePage = Partial<Page>;

export const urlAvailabilityPage = async (page_url: string): Promise<UrlAvailabilityResponse> => {
  const res = await api.get(`pages/verify/url?url=${page_url}`);
  return res.data;
}


export const createPage = async (page: CreatePage): Promise<CreatePage> => {
  const res = await api.post('pages/create', page);
  return res.data;
}

export const updatePage = async (page: UpdatePage): Promise<Page> => {
  const user = useAppStore.getState().user;

  const res = await api.post('pages/update',
    {
      token: user.token,
      ...page
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data;
}

export const getPage = async (page_url: string): Promise<Page> => {
  const res = await api.get(`pages/${page_url}`);
  return res.data;
}

export const getPageByToken = async (token: string): Promise<Page> => {
  const res = await api.get(`pages/edit/${token}`);
  console.log(res.data);
  return res.data;
}

export const fetchTrainers = async (): Promise<Page[]> => {
  const res = await api.get('pages/search');
  return res.data;
}
