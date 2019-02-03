import { OwnPostListComponent } from './../../components/own-postlist/own-postlist.component';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../core/store';
import * as fromAuth from '../../../core/store/selectors/auth.selectors';
import * as fromPost from '../../../core/store/selectors/post.selectors';
import * as authAction from '../../../core/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { PostVO } from '../../../shared/models/post.model';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );
  username$: Observable<string> = this.store.select(fromAuth.selectUsername);

  ownPostListPortal: ComponentPortal<
    OwnPostListComponent
  > = new ComponentPortal(OwnPostListComponent);

  ownPostListVisible = false;

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}

  onClickSignOut() {
    this.store.dispatch(new authAction.SignOut());
  }

  toggleOwnPostListVisible() {
    this.ownPostListVisible = !this.ownPostListVisible;
  }
}
