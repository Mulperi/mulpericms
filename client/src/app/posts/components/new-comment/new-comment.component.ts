import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../root/store/reducers';
import * as fromComment from '../../../root/store/selectors/comment.selectors';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent {
  @Input()
  username: string;

  @Input()
  amountOfComments: number;

  @Output()
  saveComment = new EventEmitter();

  saving$: Observable<boolean> = this.store.select(
    fromComment.selectCommentSaving
  );

  constructor(private store: Store<fromStore.State>) {}

  onClickSaveComment(comment: string) {
    this.saveComment.emit(comment);
  }
}
