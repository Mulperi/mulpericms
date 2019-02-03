import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadAll = '[Posts] Load All',
  LoadAllSuccess = '[Posts] Load All Success',
  LoadAllFailed = '[Posts] Load All Failed',
  Save = '[Posts] Save',
  SavePostSuccess = '[Posts] Save Success',
  SavePostFailed = '[Posts] Save Failed',
  Select = '[Posts] Select',
  Delete = '[Posts] Delete',
  DeleteSuccess = '[Posts] Delete Success',
  DeleteFailed = '[Posts] Delete Failed'
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
export class Save implements Action {
  readonly type = ActionTypes.Save;
  constructor(
    public payload: { title: string; body: string; tags: string[] }
  ) {}
}
export class SaveSuccess implements Action {
  readonly type = ActionTypes.SavePostSuccess;
  constructor(public payload: any) {}
}
export class SaveFailed implements Action {
  readonly type = ActionTypes.SavePostFailed;
  constructor(public payload: string) {}
}
export class Select implements Action {
  readonly type = ActionTypes.Select;
  constructor(public payload: string) {}
}
export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: string) {}
}
export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(public payload: string) {}
}
export class DeleteFailed implements Action {
  readonly type = ActionTypes.DeleteFailed;
  constructor(public payload: string) {}
}

export type ActionsUnion =
  | LoadAll
  | LoadAllSuccess
  | LoadAllFailed
  | Save
  | SaveSuccess
  | SaveFailed
  | Select
  | Delete
  | DeleteSuccess
  | DeleteFailed;
