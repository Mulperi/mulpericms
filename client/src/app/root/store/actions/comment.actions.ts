import { Action } from '@ngrx/store';
import { CommentDTO } from '../../../shared/models/comment.model';

export enum ActionTypes {
  Load = '[Comments] Load',
  LoadSuccess = '[Comments] Load Success',
  LoadFailed = '[Comments] Load Failed',
  Save = '[Comments] Save'
}

export class Load implements Action {
  readonly type = ActionTypes.Load;
  constructor(public payload: string) {}
}
export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: CommentDTO[]) {}
}
export class LoadFailed implements Action {
  readonly type = ActionTypes.LoadFailed;
  constructor(public payload: string) {}
}
export class Save implements Action {
  readonly type = ActionTypes.Save;
  constructor(public payload: any) {}
}

export type ActionsUnion = Load | LoadSuccess | LoadFailed | Save;
