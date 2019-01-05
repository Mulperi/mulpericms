import { environment } from './../../../../environments/environment';
import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromPosts from './post.reducer';

export interface State {
  router: RouterReducerState;
  posts: fromPosts.State;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  posts: fromPosts.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

// Get posts branch
export const selectPosts = (state: State) => state.posts;
export const selectPostsAll = createSelector(
  selectPosts,
  (state: fromPosts.State) => state.posts
);
export const selectPostsLoading = createSelector(
  selectPosts,
  (state: fromPosts.State) => state.loading
);
