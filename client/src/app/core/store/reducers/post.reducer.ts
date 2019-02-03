import * as fromPostActions from '../actions/post.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostDTO } from '../../../shared/models/post.model';

export const adapter: EntityAdapter<PostDTO> = createEntityAdapter<PostDTO>();

export interface State extends EntityState<PostDTO> {
  posts: PostDTO[];
  loading: boolean;
  saving: boolean;
  errorMessage: string;
  currentPostId: string;
  deleting: boolean;
}

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
  posts: [],
  loading: false,
  saving: false,
  errorMessage: null,
  currentPostId: null,
  deleting: false
});

export function reducer(
  state = initialState,
  action: fromPostActions.ActionsUnion
): State {
  switch (action.type) {
    case fromPostActions.ActionTypes.LoadAll: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPostActions.ActionTypes.LoadAllFailed: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    case fromPostActions.ActionTypes.LoadAllSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        posts: action.payload,
        loading: false
      });
    }
    case fromPostActions.ActionTypes.Save: {
      return {
        ...state,
        saving: true
      };
    }
    case fromPostActions.ActionTypes.SavePostSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        posts: [...state.posts, action.payload],
        saving: false
      });
    }
    case fromPostActions.ActionTypes.SavePostFailed: {
      return {
        ...state,
        saving: false
      };
    }
    case fromPostActions.ActionTypes.Select: {
      return {
        ...state,
        currentPostId: action.payload
      };
    }
    case fromPostActions.ActionTypes.Delete: {
      return {
        ...state,
        deleting: true
      };
    }
    case fromPostActions.ActionTypes.DeleteFailed: {
      return {
        ...state,
        deleting: false
      };
    }
    case fromPostActions.ActionTypes.DeleteSuccess: {
      const updatedPosts = state.posts.filter(
        post => post.id !== action.payload
      );

      return adapter.removeOne(action.payload, {
        ...state,
        posts: updatedPosts,
        deleting: false
      });
    }

    default: {
      return state;
    }
  }
}
