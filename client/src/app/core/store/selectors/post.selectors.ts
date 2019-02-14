import { createSelector } from '@ngrx/store';
import { selectPosts } from '../reducers';
import { selectAuth } from '../reducers';
import * as fromPost from '../reducers/post.reducer';
import * as fromAuth from '../reducers/auth.reducer';
import orderBy from 'lodash/orderBy';
import { fromUnixTime } from 'date-fns';
import { PostDTO, PostVO } from '../../../shared/models/post.model';

export const selectPostEntities = createSelector(
  selectPosts,
  (state: fromPost.State) => state.entities
);
export const selectPostsAllAsArray = createSelector(
  selectPostEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
export const selectPostsAllLatestFirst = createSelector(
  selectPostsAllAsArray,
  (posts: PostDTO[]) => {
    /*
      TODO: Write own sort function to get rid of lodash
    */
    return orderBy(posts, 'date', 'desc').map((post: PostDTO) => ({
      ...post,
      date: fromUnixTime(post.date)
        .toString()
        .slice(0, 21)
    })) as PostVO[];
  }
);

export const selectCurrentPostId = createSelector(
  selectPosts,
  (state: fromPost.State) => state.currentPostId
);
export const selectCurrentPost = createSelector(
  selectPostEntities,
  selectCurrentPostId,
  (postEntities, currentPostId) =>
    postEntities[currentPostId]
      ? {
          ...postEntities[currentPostId],
          date: fromUnixTime(postEntities[currentPostId].date)
            .toString()
            .slice(0, 21)
        }
      : false
);
export const selectOwnPosts = createSelector(
  selectAuth,
  selectPostsAllLatestFirst,
  (authState: fromAuth.State, posts: PostVO[]) =>
    posts.filter((post: PostVO) => post.author === authState.username)
);
export const selectPostsLoading = createSelector(
  selectPosts,
  (state: fromPost.State) => state.loading
);
export const selectPostSaving = createSelector(
  selectPosts,
  (state: fromPost.State) => state.saving
);
export const selectPostErrorMessage = createSelector(
  selectPosts,
  (state: fromPost.State) => state.errorMessage
);
export const selectPostsDeleting = createSelector(
  selectPosts,
  (state: fromPost.State) => state.deleting
);
