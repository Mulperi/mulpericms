import { Action } from '@ngrx/store';
import { CommentDTO } from '../../../shared/models/comment.model';

export enum ActionTypes {
  LoadAll = '[Comments] Load All',
  LoadAllSuccess = '[Comments] Load All Success',
  LoadAllFailed = '[Comments] Load AllFailed',
  Save = '[Comments] Save',
  SaveSuccess = '[Comments] Save Success',
  SaveFailed = '[Comments] Save Failed'
}

export class LoadAll implements Action {
  readonly type = ActionTypes.LoadAll;
}
export class LoadAllSuccess implements Action {
  readonly type = ActionTypes.LoadAllSuccess;
  constructor(public payload: CommentDTO[]) {}
}
export class LoadAllFailed implements Action {
  readonly type = ActionTypes.LoadAllFailed;
  constructor(public payload: string) {}
}
export class Save implements Action {
  readonly type = ActionTypes.Save;
  constructor(public payload: any) {}
}
export class SaveSuccess implements Action {
  readonly type = ActionTypes.SaveSuccess;
  constructor(public payload: CommentDTO) {}
}
export class SaveFailed implements Action {
  readonly type = ActionTypes.SaveFailed;
  constructor(public payload: any) {}
}

export type ActionsUnion =
  | LoadAll
  | LoadAllSuccess
  | LoadAllFailed
  | Save
  | SaveSuccess
  | SaveFailed;
