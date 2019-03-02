import * as fromCommentActions from '../actions/comment.actions';
import { CommentDTO } from '../../../shared/models/comment.model';
import cloneDeep from 'lodash/cloneDeep';
export interface State {
  comments: {
    [key: string]: CommentDTO[];
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

/**
 * Helper function to udpate the comments-oject
 * This will go through an array of comments
 * and id-map the indexes to the comments-object
 *
 * Also notice that the commentsObject that comes in
 * needs to be deepCloned, shallow-cloning leads to
 * store-freeze error since it's referencing to the
 * frozen object in the state
 */
function updateComments(commentsArray, commentsObject) {
  return commentsArray.reduce((result, item, index, array) => {
    if (!result[item.postId]) {
      result[item.postId] = [];
      result[item.postId].push(item);
    } else {
      const ids = commentsObject[item.postId].map(comment => comment.id);
      if (!ids.includes(item.id)) {
        result[item.postId].push(item);
      }
    }
    return result;
  }, commentsObject);
}

export function reducer(
  state = initialState,
  action: fromCommentActions.ActionsUnion
): State {
  switch (action.type) {
    case fromCommentActions.ActionTypes.LoadAll: {
      return {
        ...state,
        loading: true
      };
    }
    case fromCommentActions.ActionTypes.LoadAllSuccess: {
      if (action.payload.length > 0) {
        return {
          ...state,
          loading: false,
          comments: updateComments(action.payload, cloneDeep(state.comments))
        };
      } else {
        return {
          ...state,
          loading: false
        };
      }
    }
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
      const updatedComments = cloneDeep(state.comments);

      if (!updatedComments[action.payload.postId]) {
        updatedComments[action.payload.postId] = [];
      }

      updatedComments[action.payload.postId].push(action.payload);

      return {
        ...state,
        saving: false,
        comments: updatedComments
      };
    }
    case fromCommentActions.ActionTypes.SaveFailed: {
      return {
        ...state,
        saving: false
      };
    }
    // case fromCommentActions.ActionTypes.Delete:
    //   {
    //     return {
    //       ...state,
    //       deleting: true
    //     };
    //   }
    // case
    //   fromCommentActions.ActionTypes.DeleteSuccess:
    //   {
    //     return
    //     adapter.removeOne(action.payload, {
    //       ...state,
    //       deleting: false
    //     });
    //   }
    // case fromCommentActions.ActionTypes.DeleteFailed:
    //   {
    //     return {
    //       ...state,
    //       deleting: false
    //     };
    //   }
    default: {
      return state;
    }
  }
}
