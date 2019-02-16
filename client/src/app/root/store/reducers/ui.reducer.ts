import * as Ui from '../actions/ui.actions';

export interface State {
  snackbarVisible: boolean;
  snackbarMessage: { message: string; color: string };
}

export const initialState: State = {
  snackbarVisible: false,
  snackbarMessage: { message: '', color: 'neutral' }
};

export function reducer(state = initialState, action: Ui.ActionsUnion): State {
  switch (action.type) {
    case Ui.ActionTypes.SnackbarShow: {
      return {
        ...initialState,
        snackbarVisible: true,
        snackbarMessage: {
          message: action.payload.message,
          color: action.payload.color
        }
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
