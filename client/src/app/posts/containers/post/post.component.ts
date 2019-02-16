import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../root/store/reducers';
import * as postAction from '../../../root/store/actions/post.actions';
import * as fromPost from '../../../root/store/selectors/post.selectors';
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
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.postSub.unsubscribe();
  }

  onClickBack() {
    this.location.back();
  }
}
