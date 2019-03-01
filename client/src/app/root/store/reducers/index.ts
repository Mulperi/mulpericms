import { environment } from './../../../../environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromPosts from './post.reducer';
import * as fromComments from './comment.reducer';
import * as fromAuth from './auth.reducer';
import * as fromUi from './ui.reducer';

export interface State {
  router: RouterReducerState;
  posts: fromPosts.State;
  comments: fromComments.State;
  auth: fromAuth.State;
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  posts: fromPosts.reducer,
  comments: fromComments.reducer,
  auth: fromAuth.reducer,
  ui: fromUi.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

export const selectPosts = (state: State) => state.posts;
export const selectComments = (state: State) => state.comments;
export const selectAuth = (state: State) => state.auth;
export const selectUi = (state: State) => state.ui;
