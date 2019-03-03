import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../root/store/reducers';
import * as postAction from '../../../root/store/actions/post.actions';
import * as commentAction from '../../../root/store/actions/comment.actions';
import * as fromPost from '../../../root/store/selectors/post.selectors';
import * as fromAuth from '../../../root/store/selectors/auth.selectors';
import * as fromComment from '../../../root/store/selectors/comment.selectors';
import { PostVO } from './../../../shared/models/post.model';
import { Location } from '@angular/common';
import { CommentVO } from 'src/app/shared/models/comment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  post: PostVO;
  currentUser: string;
  postSub: Subscription;
  idSub: Subscription;
  currentUserSub: Subscription;
  comments$: Observable<CommentVO[]> = this.store.select(
    fromComment.selectCommentVOsForPostOrdered
  );

  constructor(
    private store: Store<fromStore.State>,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.idSub = this.route.params.subscribe(params =>
      this.store.dispatch(new postAction.Select(params.id))
    );
    this.postSub = this.store
      .select(fromPost.selectCurrentPost)
      .subscribe((post: PostVO) => (this.post = post));
    this.currentUserSub = this.store
      .select(fromAuth.selectUsername)
      .subscribe((username: string) => (this.currentUser = username));
  }

  onSaveComment(comment: string) {
    this.store.dispatch(
      new commentAction.Save({
        author: this.currentUser,
        body: comment,
        postId: this.post.id
      })
    );
  }

  onDeleteComment(comment: CommentVO) {
    if (confirm('Delete comment? ' + comment.body)) {
      this.store.dispatch(new commentAction.Delete(comment));
    }
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.postSub.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

  onClickBack() {
    this.location.back();
  }
}
