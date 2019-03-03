import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import * as commentAction from '../../store/actions/comment.actions';
import { Observable } from 'rxjs';
import { CommentVO } from '../../../shared/models/comment.model';
import * as fromComment from '../../../root/store/selectors/comment.selectors';

@Component({
  selector: 'app-own-commentlist',
  templateUrl: './own-commentlist.component.html',
  styleUrls: ['./own-commentlist.component.scss']
})
export class OwnCommentListComponent implements OnInit {
  // ownComments$: Observable<CommentVO[]> = this.store.select(
  //   fromComment.
  // );
  // deleting$: Observable<boolean> = this.store.select(
  //   fromComment.
  // );

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}

  // onDeleteComment(comment: CommentVO) {
  //   if (
  //     confirm('Are you sure to delete this comment: ' + comment.title + '?')
  //   ) {
  //     this.store.dispatch(new commentAction.Delete(comment.id));
  //   }
  // }
}
