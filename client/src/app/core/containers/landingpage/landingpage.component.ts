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
  signUpError$ = this.store.select(fromAuth.selectAuthSignUpError);
  signingUp$ = this.store.select(fromAuth.selectAuthSigningUp);

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}

  onClickRegister(username: string, password: string) {
    console.log(username, password);
    this.store.dispatch(new authAction.SignUp({ username, password }));
  }
}
