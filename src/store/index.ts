import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// >> START USER SLICE
const initialUser = {
  token: '',
  id: '',
  email: '',
  is_cref_verified: false,
  cref: '',
  createdAt: '',
  updatedAt: '',
  type: '',
};

export interface User {
  token: string;
  id: string;
  email: string;
  is_cref_verified: boolean;
  cref: string;
  createdAt: string;
  updatedAt: string;
  type: string;
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

// >> START PAGE SLICE
const initialPage = {
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
interface AppState extends UserSlice, PageSlice { }

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createUserSlice(set, get, api),
        ...createPageSlice(set, get, api),
      }),
      { name: 'app-store' }
    )
  )
);

export default useAppStore;
