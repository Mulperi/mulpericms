import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../root/store/reducers';
import * as postAction from '../../../root/store/actions/post.actions';
import * as commentAction from '../../../root/store/actions/comment.actions';
import * as fromPost from '../../../root/store/selectors/post.selectors';
import * as fromComment from '../../../root/store/selectors/comment.selectors';
import { PostVO } from './../../../shared/models/post.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  post: PostVO;
  postSub: Subscription;

  idSub: Subscription;

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

    this.store
      .select(fromComment.selectCommentsForPost)
      .subscribe(data => console.log(data));

    this.store.dispatch(new commentAction.Load(this.post.id));
  }

  onClickSaveComment(comment: string) {
    console.log(comment);
    this.store.dispatch(
      new commentAction.Save({ body: comment, postId: this.post.id })
    );
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.postSub.unsubscribe();
  }

  onClickBack() {
    this.location.back();
  }
}
