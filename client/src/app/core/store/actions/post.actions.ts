import { Action } from '@ngrx/store';
import { PostVO } from '../../../models/post-vo.model';

export enum ActionTypes {
  LoadAll = '[Posts] Load All',
  LoadAllSuccess = '[Posts] Load All Success',
  LoadAllFail = '[Posts] Load All Fail'
}

export class LoadAll implements Action {
  readonly type = ActionTypes.LoadAll;
}

export class LoadAllSuccess implements Action {
  readonly type = ActionTypes.LoadAllSuccess;
  constructor(public payload: PostVO[]) {}
}

export type ActionsUnion = LoadAll | LoadAllSuccess;
