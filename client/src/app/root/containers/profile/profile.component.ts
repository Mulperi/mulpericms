import { OwnPostListComponent } from './../../components/own-postlist/own-postlist.component';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../root/store';
import * as fromAuth from '../../../root/store/selectors/auth.selectors';
import * as fromPost from '../../../root/store/selectors/post.selectors';

import { Observable } from 'rxjs';
import { PostVO } from '../../../shared/models/post.model';
import { ComponentPortal } from '@angular/cdk/portal';
import { PersonalDetailsComponent } from '../../components';

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

  personalDetailsPortal: ComponentPortal<
    PersonalDetailsComponent
  > = new ComponentPortal(PersonalDetailsComponent);

  ownPostListVisible = true;
  personalDetailsVisible = true;

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}



  toggleOwnPostListVisible() {
    this.ownPostListVisible = !this.ownPostListVisible;
  }
  togglePersonalDetailsVisible() {
    this.personalDetailsVisible = !this.personalDetailsVisible;
  }
}
