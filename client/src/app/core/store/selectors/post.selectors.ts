import { createSelector } from '@ngrx/store';
import { selectPosts } from '../reducers';
import { State } from '../reducers/post.reducer';
import * as _ from 'lodash';

export const selectPostsAll = createSelector(
  selectPosts,
  (state: State) => state.posts
);
export const selectPostsAllLatestFirst = createSelector(
  selectPostsAll,
  (posts: any[]) => {
    return _.orderBy(posts, 'date', 'desc');
  }
);
export const selectPostsLoading = createSelector(
  selectPosts,
  (state: State) => state.loading
);
export const selectPostSaving = createSelector(
  selectPosts,
  (state: State) => state.saving
);
export const selectPostErrorMessage = createSelector(
  selectPosts,
  (state: State) => state.errorMessage
);
