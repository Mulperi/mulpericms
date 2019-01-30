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
  (posts: any[]) => _.orderBy(posts, 'date', 'desc')
);
export const selectPostEntities = createSelector(
  selectPosts,
  (state: State) => state.entities
);
export const selectCurrentPostId = createSelector(
  selectPosts,
  (state: State) => state.currentPostId
);
export const selectCurrentPost = createSelector(
  selectPostEntities,
  selectCurrentPostId,
  (postEntities, currentPostId) => postEntities[currentPostId]
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
