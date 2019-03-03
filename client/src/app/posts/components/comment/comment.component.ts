import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentVO } from 'src/app/shared/models/comment.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../root/store/reducers';
import * as fromComment from '../../../root/store/selectors/comment.selectors';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input()
  comment: CommentVO;

  @Input()
  currentUser: string;

  @Output()
  deleteComment = new EventEmitter<CommentVO>();

  deleting$: Observable<boolean> = this.store.select(
    fromComment.selectCommentDeleting
  );

  constructor(private store: Store<fromStore.State>) {}

  onDeleteComment() {
    this.deleteComment.emit(this.comment);
  }
}
