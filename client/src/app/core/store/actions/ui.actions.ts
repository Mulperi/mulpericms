import { Action } from '@ngrx/store';

export enum ActionTypes {
  SnackbarShow = '[Ui] Snackbar Show ',
  SnackbarHide = '[Ui] Snackbar Hide'
}
export class SnackbarShow implements Action {
  readonly type = ActionTypes.SnackbarShow;
  constructor(public payload: string) {}
}
export class SnackbarHide implements Action {
  readonly type = ActionTypes.SnackbarHide;
  constructor() {}
}

export type ActionsUnion = SnackbarShow | SnackbarHide;
