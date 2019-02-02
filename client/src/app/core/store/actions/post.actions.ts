import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadAll = '[Posts] Load All',
  LoadAllSuccess = '[Posts] Load All Success',
  LoadAllFailed = '[Posts] Load All Failed',
  SavePost = '[Posts] Save Post',
  SavePostSuccess = '[Posts] Save Post Success',
  SavePostFailed = '[Posts] Save Post Failed',
  SelectPost = '[Posts] Select'
}

export class LoadAll implements Action {
  readonly type = ActionTypes.LoadAll;
  constructor() {}
}
export class LoadAllSuccess implements Action {
  readonly type = ActionTypes.LoadAllSuccess;
  constructor(public payload: any[]) {}
}
export class LoadAllFailed implements Action {
  readonly type = ActionTypes.LoadAllFailed;
  constructor(public payload: any) {}
}
export class SavePost implements Action {
  readonly type = ActionTypes.SavePost;
  constructor(public payload: { body: string; tags: string[] }) {}
}
export class SavePostSuccess implements Action {
  readonly type = ActionTypes.SavePostSuccess;
  constructor(public payload: any) {}
}
export class SavePostFailed implements Action {
  readonly type = ActionTypes.SavePostFailed;
  constructor(public payload: string) {}
}
export class SelectPost implements Action {
  readonly type = ActionTypes.SelectPost;
  constructor(public payload: string) {}
}

export type ActionsUnion =
  | LoadAll
  | LoadAllSuccess
  | LoadAllFailed
  | SavePost
  | SavePostSuccess
  | SavePostFailed
  | SelectPost;
