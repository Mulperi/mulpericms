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
  (entities, currentPostId) => {
    if (currentPostId && entities[currentPostId]) {
      return Object.keys(entities[currentPostId]).map(
        id => entities[currentPostId][id]
      ) as CommentDTO[];
    }
    return [];
  }
);

export const selectCommentVOsForPostOrdered = createSelector(
  selectCommentsForPost,
  comments =>
    orderBy(
      comments.map(comment => ({
        ...comment,
        date: fromUnixTime(comment.date)
          .toString()
          .slice(0, 21)
      })) as CommentVO[],
      'date',
      'desc'
    )
);

export const selectCommentSaving = createSelector(
  selectComments,
  (state: fromComment.State) => state.saving
);
export const selectCommentDeleting = createSelector(
  selectComments,
  (state: fromComment.State) => state.deleting
);
export const selectCommentLoading = createSelector(
  selectComments,
  (state: fromComment.State) => state.loading
);

// export const selectOwnComments = createSelector(
//   selectAllComments,
// );

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
