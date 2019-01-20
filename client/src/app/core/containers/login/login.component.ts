import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import * as fromAuth from '../../store/selectors/auth.selectors';
import * as authAction from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  onClickLogin(username: string, password: string) {
    this.store.dispatch(new authAction.Login({ username, password }));
  }

  onClickSignOut() {
    this.store.dispatch(new authAction.SignOut());
  }
}
