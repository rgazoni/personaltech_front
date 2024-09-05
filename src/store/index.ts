import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// >> START USER SLICE
export const initialUser = {
  token: '',
  id: '',
  email: '',
  is_cref_verified: '',
  cref: '',
  createdAt: '',
  updatedAt: '',
  type: '',
  role: '',
};

export interface User {
  token: string;
  id: string;
  email: string;
  is_cref_verified: string;
  cref: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  role: string;
}

interface UserSlice {
  user: User;
  updateUser: (user: User) => void;
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: initialUser,
  updateUser: (user) => set({ user }),
});
// << END USER SLICE

// >> START CLIENT SLICE
export const initialClient = {
  token: '',
  id: '',
  email: '',
  createdAt: '',
  updatedAt: '',
  role: '',
  full_name: '',
  birthdate: '',
  avatar: '',
  sawNot: false,
  md5Not: '',
};

export interface Client {
  token: string;
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  full_name: string;
  birthdate: string;
  avatar: string;
  sawNot: boolean;
  md5Not: string;
}

interface ClientSlice {
  client: Client;
  updateClient: (client: Client) => void;
  setSawNotifications: (saw: boolean, md5: string) => void;
}

const createClientSlice: StateCreator<ClientSlice, [], [], ClientSlice> = (set) => ({
  client: initialClient,
  updateClient: (client) => set({ client }),
  setSawNotifications: (saw: boolean, md5: string) =>
    set((state) => ({ client: { ...state.client, sawNot: saw, md5Not: md5 } })),
});
// << END CLIENT SLICE


// >> START PAGE SLICE
export const initialPage = {
  page_name: '',
  expertises: [],
  url: '',
  profession: '',
  service_value: '',
  about_you: '',
  whatsapp: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  presentation_video: '',
  background_color: '#272727',
  avatar: '',
  avatarFile: new File([], ''),
  is_published: false,
};

export interface Page {
  page_name: string;
  expertises: string[];
  url: string;
  profession: string;
  service_value: string;
  about_you: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  presentation_video: string;
  background_color: string;
  avatar: string;
  avatarFile: File;
  is_published: boolean;
  cref?: string;
}

interface PageSlice {
  page: Page;
  updatePage: (page: Page) => void;
  updatePartialPage: (pageFields: Partial<Page>) => void;
  updatePageField: (field: string, value: string) => void;
}

const createPageSlice: StateCreator<PageSlice, [], [], PageSlice> = (set) => ({
  page: initialPage,
  updatePage: (page) => set({ page }),
  updatePartialPage: (pageFields: Partial<Page>) => set((state) => ({ page: { ...state.page, ...pageFields } })),
  updatePageField: (field: string, value: string) =>
    set((state) => ({ page: { ...state.page, [field]: value } })),
});
// << END PAGE SLICE



// Combine the slices
interface AppState extends UserSlice, PageSlice, ClientSlice { }

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createUserSlice(set, get, api),
        ...createPageSlice(set, get, api),
        ...createClientSlice(set, get, api),
      }),
      { name: 'app-store' }
    )
  )
);

export default useAppStore;
