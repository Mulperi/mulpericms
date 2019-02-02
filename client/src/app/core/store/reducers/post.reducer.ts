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
}

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
  posts: [],
  loading: false,
  saving: false,
  errorMessage: null,
  currentPostId: null
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
    case fromPostActions.ActionTypes.SavePost: {
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
    case fromPostActions.ActionTypes.SelectPost: {
      return {
        ...state,
        currentPostId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
