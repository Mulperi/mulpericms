import { Action } from '@ngrx/store';
import {
  CommentDTO,
  CommentVO,
  CommentDeleteSuccessResponse
} from '../../../shared/models/comment.model';

export enum ActionTypes {
  LoadAll = '[Comments] Load All',
  LoadAllSuccess = '[Comments] Load All Success',
  LoadAllFailed = '[Comments] Load AllFailed',
  Save = '[Comments] Save',
  SaveSuccess = '[Comments] Save Success',
  SaveFailed = '[Comments] Save Failed',
  Delete = '[Comments] Delete',
  DeleteSuccess = '[Comments] Delete Success',
  DeleteFailed = '[Comments] Delete Failed'
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
export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: CommentVO) {}
}
export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(public payload: CommentDeleteSuccessResponse) {}
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
  | Delete
  | DeleteSuccess
  | DeleteFailed;
