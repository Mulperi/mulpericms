import { createSelector } from '@ngrx/store';
import { selectPosts } from '../reducers';
import { State } from '../reducers/post.reducer';

export const selectPostsAll = createSelector(
  selectPosts,
  (state: State) => state.posts
);
export const selectPostsLoading = createSelector(
  selectPosts,
  (state: State) => state.loading
);
export const selectPostSaving = createSelector(
  selectPosts,
  (state: State) => state.saving
);
