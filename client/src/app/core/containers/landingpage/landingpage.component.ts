import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import * as fromAuth from '../../store/selectors/auth.selectors';
import * as authAction from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingPageComponent implements OnInit {
  signUpError$: Observable<string> = this.store.select(
    fromAuth.selectAuthSignUpError
  );
  signingUp$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthSigningUp
  );
  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}

  onClickRegister(preferred_username: string, email: string, password: string) {
    this.store.dispatch(
      new authAction.SignUp({
        username: email,
        password: password,
        attributes: { preferred_username }
      })
    );
  }
}
