import * as Auth from '../actions/auth.actions';

export interface State {
  username: string;
  authenticating: boolean;
  authenticated: boolean;
  signInError: string;
  requiredAttributes: string[];
  userAttributes: string[];
  signingUp: boolean;
  signUpSuccess: boolean;
  signUpError: string;
  confirming: boolean;
  confirmationError: string;
  confirmed: boolean;
}

export const initialState: State = {
  username: null,
  authenticating: false,
  authenticated: false,
  signInError: null,
  requiredAttributes: [],
  userAttributes: [],
  signingUp: false,
  signUpSuccess: false,
  signUpError: null,
  confirming: false,
  confirmationError: null,
  confirmed: false
};

export function reducer(
  state = initialState,
  action: Auth.ActionsUnion
): State {
  switch (action.type) {
    case Auth.ActionTypes.SignIn: {
      return {
        ...initialState,
        authenticating: true
      };
    }
    case Auth.ActionTypes.SignInSuccess: {
      return {
        ...initialState,
        authenticated: true,
        username: action.payload
      };
    }

    case Auth.ActionTypes.NewPasswordRequired: {
      return {
        ...initialState,
        authenticating: false,
        username: action.payload.username,
        requiredAttributes: action.payload.requiredAttributes,
        userAttributes: action.payload.userAttributes
      };
    }

    case Auth.ActionTypes.SignInFailed: {
      return {
        ...initialState,
        signInError: action.payload
      };
    }

    case Auth.ActionTypes.CompleteNewPassword: {
      return {
        ...initialState
      };
    }

    case Auth.ActionTypes.SignOutSuccess: {
      return {
        ...initialState
      };
    }

    case Auth.ActionTypes.SignUp: {
      return {
        ...initialState,
        signingUp: true
      };
    }
    case Auth.ActionTypes.SignUpSuccess: {
      return {
        ...initialState,
        signUpSuccess: true,
        username: action.payload
      };
    }
    case Auth.ActionTypes.SignUpFailed: {
      return {
        ...initialState,
        signUpError: action.payload
      };
    }

    case Auth.ActionTypes.ConfirmEmail: {
      return {
        ...initialState,
        confirming: true
      };
    }

    case Auth.ActionTypes.ConfirmEmailSuccess: {
      return {
        ...initialState,
        confirmed: true
      };
    }

    case Auth.ActionTypes.ConfirmEmailFailed: {
      return {
        ...initialState,
        confirmationError: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
