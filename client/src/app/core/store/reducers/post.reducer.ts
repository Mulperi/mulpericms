import * as Post from '../actions/post.actions';

export interface State {
  posts: any[];
  loading: boolean;
  saving: boolean;
  errorMessage: string;
}

export const initialState: State = {
  posts: [],
  loading: false,
  saving: false,
  errorMessage: null
};

export function reducer(
  state = initialState,
  action: Post.ActionsUnion
): State {
  switch (action.type) {
    case Post.ActionTypes.LoadAll: {
      return {
        ...state,
        loading: true
      };
    }
    case Post.ActionTypes.LoadAllFailed: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    case Post.ActionTypes.LoadAllSuccess: {
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    }
    case Post.ActionTypes.SavePost: {
      return {
        ...state,
        saving: true
      };
    }
    case Post.ActionTypes.SavePostSuccess: {
      return {
        ...state,
        saving: false
      };
    }

    default: {
      return state;
    }
  }
}
