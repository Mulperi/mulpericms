import * as Auth from '../actions/auth.actions';

export interface State {
  user: any;
  username: string;
  authenticating: boolean;
  authenticated: boolean;
  error: string;
  requiredAttributes: string[];
  userAttributes: string[];
}

export const initialState: State = {
  user: null,
  username: null,
  authenticating: false,
  authenticated: false,
  error: null,
  requiredAttributes: [],
  userAttributes: []
};

export function reducer(
  state = initialState,
  action: Auth.ActionsUnion
): State {
  switch (action.type) {
    case Auth.ActionTypes.Login: {
      return {
        ...initialState,
        authenticating: true
      };
    }
    case Auth.ActionTypes.LoginSuccess: {
      return {
        ...initialState,
        authenticating: false,
        authenticated: true,
        error: null,
        username: action.payload
      };
    }

    case Auth.ActionTypes.NewPasswordRequired: {
      return {
        ...initialState,
        authenticating: false,
        error: null,
        username: action.payload.username,
        requiredAttributes: action.payload.requiredAttributes,
        userAttributes: action.payload.userAttributes
      };
    }

    case Auth.ActionTypes.LoginFailed: {
      let message;

      if (action.payload.message) {
        message = action.payload.message;
      } else {
        message = null;
      }

      return {
        ...initialState,
        error: message
      };
    }

    case Auth.ActionTypes.CompleteNewPassword: {
      return {
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
}
