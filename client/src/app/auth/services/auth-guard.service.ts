import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { CognitoService } from './cognito-amplify.service';

import * as fromStore from '../../core/store';
import * as uiAction from '../../core/store/actions/ui.actions';
import { of } from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    // public cognitoService: CognitoService,
    public router: Router,
    private store: Store<fromStore.State>
  ) {}

  canActivate(): boolean {
    return true;
    // return this.cognitoService.getSession().pipe(
    //   map(session => {
    //     if (session.isValid()) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }),
    //   catchError(error => {
    //     this.store.dispatch(
    //       new uiAction.SnackbarShow({
    //         message: 'Sign in first!',
    //         color: 'warn'
    //       })
    //     );
    //     return of(false);
    //   })
    // );
  }
}
