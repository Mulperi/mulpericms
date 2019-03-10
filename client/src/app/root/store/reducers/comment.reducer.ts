import * as fromCommentActions from '../actions/comment.actions';
import { CommentDTO } from '../../../shared/models/comment.model';
import cloneDeep from 'lodash/cloneDeep';
export interface State {
  comments: {
    [key: string]: { [key: string]: CommentDTO };
  };
  loading: boolean;
  saving: boolean;
  errorMessage: string;
  deleting: boolean;
}

export const initialState: State = {
  comments: {},
  loading: false,
  saving: false,
  errorMessage: null,
  deleting: false
};

function updateCommentEntities(comments, previousEntities) {
  return comments.reduce(
    (
      entities: { [key: string]: { [key: string]: CommentDTO } },
      comment: CommentDTO
    ) => {
      return {
        ...entities,
        [comment.postId]: {
          ...entities[comment.postId],
          [comment.id]: comment
        }
      };
    },
    {
      ...previousEntities
    }
  );
}

export function reducer(
  state = initialState,
  action: fromCommentActions.ActionsUnion
): State {
  switch (action.type) {
    case fromCommentActions.ActionTypes.Load:
    case fromCommentActions.ActionTypes.LoadAll: {
      return {
        ...state,
        loading: true
      };
    }
    case fromCommentActions.ActionTypes.LoadSuccess:
    case fromCommentActions.ActionTypes.LoadAllSuccess: {
      if (action.payload.length > 0) {
        return {
          ...state,
          loading: false,
          comments: updateCommentEntities(action.payload, { ...state.comments })
        };
      }
      return {
        ...state,
        loading: false
      };
    }
    case fromCommentActions.ActionTypes.LoadFailed:
    case fromCommentActions.ActionTypes.LoadAllFailed: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    case fromCommentActions.ActionTypes.Save: {
      return {
        ...state,
        saving: true
      };
    }
    case fromCommentActions.ActionTypes.SaveSuccess: {
      return {
        ...state,
        saving: false,
        comments: updateCommentEntities([action.payload], { ...state.comments })
      };
    }
    case fromCommentActions.ActionTypes.SaveFailed: {
      return {
        ...state,
        saving: false
      };
    }
    case fromCommentActions.ActionTypes.Delete: {
      return {
        ...state,
        deleting: true
      };
    }
    case fromCommentActions.ActionTypes.DeleteSuccess: {
      const updatedComments = cloneDeep(state.comments);
      delete updatedComments[action.payload.postId][action.payload.id];

      return {
        ...state,
        comments: updatedComments,
        deleting: false
      };
    }
    case fromCommentActions.ActionTypes.DeleteFailed: {
      return {
        ...state,
        deleting: false
      };
    }
    default: {
      return state;
    }
  }
}
