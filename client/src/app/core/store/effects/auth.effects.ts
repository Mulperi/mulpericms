import { CognitoService } from './../../services/cognito.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authAction from '../actions/auth.actions';
import * as uiAction from '../actions/ui.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.Login),
    switchMap((action: authAction.Login) =>
      this.cognitoService
        .authenticate(action.payload.username, action.payload.password)
        .pipe(
          map((user: any) => {
            console.log(user);
            // if (user.challengeName === 'NEW_PASSWORD_REQUIRED')) {

            // }
            return new authAction.LoginSuccess(user.username);
          }),
          catchError((error: any) => of(new authAction.LoginFailed(error)))
        )
    )
  );

  @Effect()
  loginFailed$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.LoginFailed),
    map(
      (action: authAction.LoginFailed) =>
        new uiAction.SnackbarShow({
          message: 'Login failed. Reason: ' + action.payload.message,
          color: 'warn'
        })
    )
  );

  @Effect({ dispatch: false })
  newPasswordRequired$: Observable<void> = this.actions$.pipe(
    ofType(authAction.ActionTypes.NewPasswordRequired),
    map((action: authAction.NewPasswordRequired) => {
      this.router.navigate(['/changepassword']);
    })
  );

  // @Effect()
  // completeNewPassword$: Observable<Action> = this.actions$.pipe(
  //   ofType(authAction.ActionTypes.CompleteNewPassword),
  //   switchMap((action: authAction.CompleteNewPassword) => {
  //     console.log('completeNewPassword effect');
  //     console.log(action.payload);
  //     return this.cognitoService
  //       .completeNewPasswordChallenge(
  //         action.payload.username,
  //         action.payload.oldPassword,
  //         action.payload.newPassword,
  //         [{ Name: 'preferred_username', Value: 'kekkonen' }]
  //       )
  //       .pipe(
  //         map(result => {
  //           console.log(result);
  //         }),
  //         catchError((error: any) => {
  //           return of(new authAction.LoginFailed(error));
  //         })
  //       );
  //   })
  // );

  constructor(
    private actions$: Actions,
    private cognitoService: CognitoService,
    private router: Router
  ) {}
}
