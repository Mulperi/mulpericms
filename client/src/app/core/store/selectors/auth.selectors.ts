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
export const selectAuthSignInError = createSelector(
  selectAuth,
  (state: State) => state.signInError
);
export const selectAuthRequiredAttributes = createSelector(
  selectAuth,
  (state: State) => state.requiredAttributes
);
export const selectAuthUserAttributes = createSelector(
  selectAuth,
  (state: State) => state.userAttributes
);
export const selectAuthSignUpError = createSelector(
  selectAuth,
  (state: State) => state.signUpError
);
export const selectAuthSigningUp = createSelector(
  selectAuth,
  (state: State) => state.signingUp
);
export const selectAuthEmailConfirming = createSelector(
  selectAuth,
  (state: State) => state.confirming
);
export const selectAuthEmailConfirmed = createSelector(
  selectAuth,
  (state: State) => state.confirmed
);
export const selectAuthEmailConfirmationError = createSelector(
  selectAuth,
  (state: State) => state.confirmationError
);
