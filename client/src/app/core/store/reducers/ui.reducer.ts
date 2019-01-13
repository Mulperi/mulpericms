import * as Ui from '../actions/ui.actions';

export interface State {
  snackbarVisible: boolean;
  snackbarMessage: string;
}

export const initialState: State = {
  snackbarVisible: false,
  snackbarMessage: ''
};

export function reducer(state = initialState, action: Ui.ActionsUnion): State {
  switch (action.type) {
    case Ui.ActionTypes.SnackbarShow: {
      return {
        ...initialState,
        snackbarVisible: true,
        snackbarMessage: action.payload
      };
    }
    case Ui.ActionTypes.SnackbarHide: {
      return {
        ...initialState,
        snackbarVisible: false
      };
    }

    default: {
      return state;
    }
  }
}
