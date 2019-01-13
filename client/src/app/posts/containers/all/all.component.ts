import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/reducers';
import * as fromPosts from '../../../core/store/selectors/post.selectors';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  posts: any[];
  postsLoading$: Observable<any> = this.store.select(
    fromPosts.selectPostsLoading
  );

  itemsPerPage = 4;
  page = 0;

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {
    this.store
      .select(fromPosts.selectPostsAll)
      .subscribe(posts => (this.posts = posts));
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
}
