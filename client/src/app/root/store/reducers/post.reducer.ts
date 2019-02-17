import * as fromPostActions from '../actions/post.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostDTO } from '../../../shared/models/post.model';

export const adapter: EntityAdapter<PostDTO> = createEntityAdapter<PostDTO>();

export interface State extends EntityState<PostDTO> {
  loading: boolean;
  saving: boolean;
  errorMessage: string;
  currentPostId: string;
  deleting: boolean;
}

export const initialState: State = adapter.getInitialState({
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
    case fromPostActions.ActionTypes.LoadAllSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false
      });
    }
    case fromPostActions.ActionTypes.LoadAllFailed: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    case fromPostActions.ActionTypes.Save: {
      return {
        ...state,
        saving: true
      };
    }
    case fromPostActions.ActionTypes.SaveSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        saving: false
      });
    }
    case fromPostActions.ActionTypes.SaveFailed: {
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
    case fromPostActions.ActionTypes.DeleteSuccess: {
      return adapter.removeOne(action.payload, {
        ...state,
        deleting: false
      });
    }
    case fromPostActions.ActionTypes.DeleteFailed: {
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
