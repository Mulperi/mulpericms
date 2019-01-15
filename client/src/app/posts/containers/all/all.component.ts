import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/reducers';
import * as fromPosts from '../../../core/store/selectors/post.selectors';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, OnDestroy {
  posts: any[];
  postsLoading$: Observable<any> = this.store.select(
    fromPosts.selectPostsLoading
  );

  itemsPerPage = 2;
  page = 0;

  errorMessageSub: Subscription;
  errorMessage: string = null;

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {
    this.store
      .select(fromPosts.selectPostsAll)
      .subscribe(posts => (this.posts = posts));

    this.errorMessageSub = this.store
      .select(fromPosts.selectPostErrorMessage)
      .subscribe(errorMessage => (this.errorMessage = errorMessage));
  }

  onPreviousClick() {
    this.page--;
  }

  onNextClick() {
    this.page++;
  }

  isLastPage() {
    return this.page >= this.posts.length / this.itemsPerPage - 1;
  }

  getPages() {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }

  ngOnDestroy() {
    this.errorMessageSub.unsubscribe();
  }
}
