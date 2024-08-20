import { initialState } from "./progress.constants";

export type ProgressActions = {
  type: 'next' | 'previous';
}

export type UpdateUserActions = {
  type: 'update-user';
  payload: {
    user: Partial<typeof initialState.user>;
  }
}
