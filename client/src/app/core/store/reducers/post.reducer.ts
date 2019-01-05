import * as Post from '../actions/post.actions';
import { PostVO } from '../../../models/post-vo.model';

export interface State {
  posts: PostVO[];
  loading: boolean;
}

export const initialState: State = {
  posts: [],
  loading: false
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
    case Post.ActionTypes.LoadAllSuccess: {
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
