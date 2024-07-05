const PASSWORD_LENGTH = 8;

const p_actions = ['length', 'equals'] as const;
type TPasswordAction = {
  type: `password-${(typeof p_actions)[number]}`;
  payload: string;
};

type TFormAction = {
  type: 'submit-form';
  payload: {
    email: string;
    password: string;
  }
};

type TInitialState = {
  len: boolean;
  curr_password: string;
  equals: boolean;
};

export const initialState: TInitialState = {
  len: false,
  curr_password: '',
  equals: false,
}

export const passwordReducer = (state = initialState, action: TPasswordAction | TFormAction) => {
  switch (action.type) {
    case 'password-length':
      return {
        len: action.payload.length >= PASSWORD_LENGTH,
        curr_password: action.payload,
        equals: state.equals
      };
    case 'password-equals':
      return {
        len: state.len,
        curr_password: state.curr_password,
        equals: action.payload === state.curr_password
      };
    default:
      return state;
  }
}
