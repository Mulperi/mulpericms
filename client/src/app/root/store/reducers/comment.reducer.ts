import * as fromCommentActions from '../actions/comment.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CommentDTO } from '../../../shared/models/comment.model';

export function selectPostId(a: CommentDTO): string {
  return a.postId;
}

export const adapter: EntityAdapter<CommentDTO> = createEntityAdapter<
  CommentDTO
>({
  selectId: selectPostId
});

export interface State extends EntityState<CommentDTO> {
  entities: { [key: string]: CommentDTO };
  loading: boolean;
  saving: boolean;
  errorMessage: string;
  deleting: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  saving: false,
  errorMessage: null,
  deleting: false
});

export function reducer(
  state = initialState,
  action: fromCommentActions.ActionsUnion
): State {
  switch (action.type) {
    case fromCommentActions.ActionTypes.Load: {
      return {
        ...state,
        loading: true
      };
    }
    case fromCommentActions.ActionTypes.LoadSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false
      });
    }
    case fromCommentActions.ActionTypes.LoadFailed: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    // case fromCommentActions.ActionTypes.Save: {
    //   return {
    //     ...state,
    //     saving: true
    //   };
    // }
    // case fromCommentActions.ActionTypes.SaveSuccess: {
    //   return adapter.addOne(action.payload, {
    //     ...state,
    //     saving: false
    //   });
    // }
    // case fromCommentActions.ActionTypes.SaveFailed: {
    //   return {
    //     ...state,
    //     saving: false
    //   };
    // }
    // case fromCommentActions.ActionTypes.Delete: {
    //   return {
    //     ...state,
    //     deleting: true
    //   };
    // }
    // case fromCommentActions.ActionTypes.DeleteSuccess: {
    //   return adapter.removeOne(action.payload, {
    //     ...state,
    //     deleting: false
    //   });
    // }
    // case fromCommentActions.ActionTypes.DeleteFailed: {
    //   return {
    //     ...state,
    //     deleting: false
    //   };
    // }
    default: {
      return state;
    }
  }
}
