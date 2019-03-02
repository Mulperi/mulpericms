import { createSelector } from '@ngrx/store';
import { selectComments } from '../reducers';
import * as fromComment from '../reducers/comment.reducer';
import * as fromPost from './post.selectors';
import orderBy from 'lodash/orderBy';
import { fromUnixTime } from 'date-fns';
import { CommentDTO, CommentVO } from '../../../shared/models/comment.model';

export const selectAllComments = createSelector(
  selectComments,
  (state: fromComment.State) => state.comments
);
export const selectCommentsForPost = createSelector(
  selectAllComments,
  fromPost.selectCurrentPostId,
  (comments, currentPostId) => {
    if (currentPostId && comments[currentPostId]) {
      return comments[currentPostId] as CommentDTO[];
    }
    return [];
  }
);

export const selectCommentVOsForPost = createSelector(
  selectCommentsForPost,
  comments =>
    comments.map(comment => ({
      ...comment,
      date: fromUnixTime(comment.date)
        .toString()
        .slice(0, 21)
    })) as CommentVO[]
);

export const selectCommentSaving = createSelector(
  selectComments,
  (state: fromComment.State) => state.saving
);

// export const selectCommentsAllAsArray = createSelector(
//   selectCommentEntities,
//   entities => Object.keys(entities).map(id => entities[id])
// );
// export const selectCommentsAllLatestFirst = createSelector(
//   selectCommentsAllAsArray,
//   (comments: CommentDTO[]) => {
//     /*
//       TODO: Write own sort function to get rid of lodash
//     */
//     return orderBy(comments, 'date', 'desc').map((comment: CommentDTO) => ({
//       ...comment,
//       date: fromUnixTime(comment.date)
//         .toString()
//         .slice(0, 21)
//     })) as CommentVO[];
//   }
// );