import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/reducers';
import * as postAction from '../../../core/store/actions/post.actions';
import * as fromPost from '../../../core/store/selectors/post.selectors';
import { Post } from './../../../shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  post: Post;
  postSub: Subscription;

  idSub: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idSub = this.route.params.subscribe(params =>
      this.store.dispatch(new postAction.SelectPost(params.id))
    );
    this.postSub = this.store
      .select(fromPost.selectCurrentPost)
      .subscribe((post: Post) => (this.post = post));
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.postSub.unsubscribe();
  }
}
