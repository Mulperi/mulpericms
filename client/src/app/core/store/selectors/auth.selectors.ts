import { selectAuth } from './../reducers/index';
import { createSelector } from '@ngrx/store';
import { State } from '../reducers/auth.reducer';

export const selectUser = createSelector(
  selectAuth,
  (state: State) => state.user
);
export const selectUsername = createSelector(
  selectAuth,
  (state: State) => state.username
);
export const selectAuthenticating = createSelector(
  selectAuth,
  (state: State) => state.authenticating
);
export const selectAuthenticated = createSelector(
  selectAuth,
  (state: State) => state.authenticated
);
export const selectAuthError = createSelector(
  selectAuth,
  (state: State) => state.error
);
export const selectAuthRequiredAttributes = createSelector(
  selectAuth,
  (state: State) => state.requiredAttributes
);
export const selectAuthUserAttributes = createSelector(
  selectAuth,
  (state: State) => state.userAttributes
);
