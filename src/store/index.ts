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
  uid_chat: '',
  state: '',
  city: '',
  sawNot: false,
  md5Not: '',
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
  uid_chat: string;
  state: string;
  city: string;
  sawNot: boolean;
  md5Not: string;
}

interface UserSlice {
  user: User;
  updateUser: (user: User) => void;
  updateUserField: (field: string, value: string) => void;
  setSawNotifications: (saw: boolean, md5: string) => void;
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: initialUser,
  updateUser: (user) => set({ user }),
  updateUserField: (field, value) => set((state) => ({ user: { ...state.user, [field]: value } })),
  setSawNotifications: (saw: boolean, md5: string) =>
    set((state) => ({ user: { ...state.user, sawNot: saw, md5Not: md5 } })),
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
  uid_chat: '',
  state: '',
  city: '',
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
  uid_chat: string;
  state: string;
  city: string;
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
  personal_id: '',
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
  personal_id: string;
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
