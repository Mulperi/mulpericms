import { createSelector } from '@ngrx/store';
import { selectPosts } from '../reducers';
import { State } from '../reducers/post.reducer';
import orderBy from 'lodash/orderBy';
import { fromUnixTime } from 'date-fns';
import { PostDTO, PostVO } from '../../../shared/models/post.model';

export const selectPostsAll = createSelector(
  selectPosts,
  (state: State) => state.posts
);
export const selectPostsAllLatestFirst = createSelector(
  selectPostsAll,
  (posts: PostDTO[]) => {
    /*
      TODO: Write own sort function to get rid of lodash
    */
    return orderBy(posts, 'date', 'desc').map((post: PostDTO) => ({
      id: post.id,
      date: fromUnixTime(post.date)
        .toString()
        .slice(0, 21),
      author: post.author,
      body: post.body,
      tags: post.tags
    })) as PostVO[];
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
  (postEntities, currentPostId) => ({
    ...postEntities[currentPostId],
    date: fromUnixTime(postEntities[currentPostId].date)
      .toString()
      .slice(0, 21)
  })
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
