import { PostService } from './../../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRootStore from '../../../core/store/reducers';
import * as postActions from '../../../core/store/actions/post.actions';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  posts$: Observable<any> = this.store.select(fromRootStore.selectPostsAll);
  postsLoading$: Observable<any> = this.store.select(
    fromRootStore.selectPostsLoading
  );

  constructor(private store: Store<fromRootStore.State>) {}
  ngOnInit() {
    this.store.dispatch(new postActions.LoadAll());
  }
}
