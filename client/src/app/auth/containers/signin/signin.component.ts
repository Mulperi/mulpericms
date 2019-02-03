import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../core/store';
import * as fromAuth from '../../../core/store/selectors/auth.selectors';
import * as authAction from '../../../core/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {
  authenticating$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticating
  );
  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );
  username$: Observable<string> = this.store.select(fromAuth.selectUsername);

  error$: Observable<any> = this.store.select(fromAuth.selectAuthSignInError);

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}

  onClickSignIn(username: string, password: string) {
    this.store.dispatch(new authAction.SignIn({ username, password }));
  }
}
