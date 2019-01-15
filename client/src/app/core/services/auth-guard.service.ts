import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CognitoService } from './cognito.service';

import * as fromStore from '../store';
import * as uiAction from '../store/actions/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    public cognitoService: CognitoService,
    public router: Router,
    private store: Store<fromStore.State>
  ) {}

  canActivate(): Observable<boolean> {
    return this.cognitoService.getSession().pipe(
      map(session => {
        if (session.isValid()) {
          return true;
        } else {
          // this.store.dispatch(
          //   new uiAction.SnackbarShow({
          //     message: 'Sign in first!',
          //     color: 'warn'
          //   })
          // );
          return false;
        }
      })
    );
  }
}
