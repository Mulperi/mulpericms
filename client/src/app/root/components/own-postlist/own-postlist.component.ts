import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import * as postAction from '../../store/actions/post.actions';
import { Observable } from 'rxjs';
import { PostVO } from '../../../shared/models/post.model';
import * as fromPost from '../../../root/store/selectors/post.selectors';

@Component({
  selector: 'app-own-postlist',
  templateUrl: './own-postlist.component.html',
  styleUrls: ['./own-postlist.component.scss']
})
export class OwnPostListComponent implements OnInit {
  ownPosts$: Observable<PostVO[]> = this.store.select(fromPost.selectOwnPosts);
  deleting$: Observable<boolean> = this.store.select(
    fromPost.selectPostsDeleting
  );

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}

  onDeletePost(post: PostVO) {
    this.store.dispatch(new postAction.Delete(post.id));
  }
}
