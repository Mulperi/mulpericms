import { Post } from './../../../shared/models/post.model';
import { createSelector } from '@ngrx/store';
import { selectPosts } from '../reducers';
import { State } from '../reducers/post.reducer';
import orderBy from 'lodash/orderBy';
import { format, fromUnixTime } from 'date-fns';

export const selectPostsAll = createSelector(
  selectPosts,
  (state: State) => state.posts
);
export const selectPostsAllLatestFirst = createSelector(
  selectPostsAll,
  (posts: any[]) => {
    /*
      TODO: Write own sort function to get rid of lodash
    */
    return orderBy(posts, 'date', 'desc').map((post: Post) => ({
      id: post.id,
      date: fromUnixTime(post.date)
        .toString()
        .slice(0, 21),
      author: post.author,
      body: post.body
    }));
  }
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
