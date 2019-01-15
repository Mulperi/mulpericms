import { CognitoService } from './../../services/cognito.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, filter } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authAction from '../actions/auth.actions';
import * as uiAction from '../actions/ui.actions';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
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
  loginFailed$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.LoginFailed),
    map(
      (action: authAction.LoginFailed) =>
        new uiAction.SnackbarShow({
          message: 'Login failed. Reason: ' + action.payload,
          color: 'warn'
        })
    )
  );

  @Effect({ dispatch: false })
  newPasswordRequired$: Observable<void> = this.actions$.pipe(
    ofType(authAction.ActionTypes.NewPasswordRequired),
    map((action: authAction.NewPasswordRequired) => {
      this.router.navigate(['/newpassword']);
    })
  );

  @Effect()
  sessionCheck$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SessionCheck),
    switchMap((action: authAction.SessionCheck) => {
      return this.cognitoService.getSession().pipe(
        map(result => {
          return new authAction.LoginSuccess(
            result.getIdToken().payload['cognito:username']
          );
        }),
        catchError(error => {
          return of(new authAction.SessionNotExist());
        })
      );
    })
  );

  @Effect()
  signOut$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignOut),
    switchMap((action: authAction.SignOut) =>
      this.cognitoService.signOut().pipe(
        map(() => {
          return new authAction.SignOutSuccess();
        }),
        catchError((error: any) => of(new authAction.LoginFailed(error)))
      )
    )
  );

  @Effect()
  signOutSuccess$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignOutSuccess),
    map(() => {
      return new uiAction.SnackbarShow({
        message: 'You signed out. Bye bye!',
        color: 'neutral'
      });
    })
  );

  @Effect()
  loginSuccess$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.LoginSuccess),
    map(() => {
      return new uiAction.SnackbarShow({
        message: 'Signed in. Welcome back!',
        color: 'success'
      });
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
