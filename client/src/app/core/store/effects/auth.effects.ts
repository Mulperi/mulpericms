import { CognitoService } from './../../../auth/services/cognito.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authAction from '../actions/auth.actions';
import * as uiAction from '../actions/ui.actions';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignIn),
    switchMap((action: authAction.SignIn) =>
      this.cognitoService
        .authenticate(action.payload.username, action.payload.password)
        .pipe(
          map((user: any) => {
            console.log(user);
            // if (user.challengeName === 'NEW_PASSWORD_REQUIRED')) {

            // }
            return new authAction.SignInSuccess(user.username);
          }),
          catchError((error: any) =>
            of(new authAction.SignInFailed(error.message))
          )
        )
    )
  );

  @Effect()
  loginFailed$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignInFailed),
    map(
      (action: authAction.SignInFailed) =>
        new uiAction.SnackbarShow({
          message: 'SignIn failed. Reason: ' + action.payload,
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
          return new authAction.SignInSuccess(
            result.getIdToken().payload.email
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
        catchError((error: any) => of(new authAction.SignInFailed(error)))
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
    ofType(authAction.ActionTypes.SignInSuccess),
    map(() => {
      return new uiAction.SnackbarShow({
        message: 'Signed in. Welcome back!',
        color: 'success'
      });
    })
  );

  @Effect()
  signUp$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignUp),
    switchMap((action: authAction.SignUp) => {
      return this.cognitoService
        .signUp(action.payload.username, action.payload.password)
        .pipe(
          map(result => {
            console.log('result', result);
            return new authAction.SignUpSuccess(result.user.username);
          }),
          catchError(error => {
            console.log('error', error);
            return of(new authAction.SignUpFailed(error.message));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  signUpSuccess$: Observable<void> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignUpSuccess),
    map((action: authAction.SignUpSuccess) => {
      this.router.navigate(['/confirmemail']);
    })
  );

  @Effect()
  confirmEmail$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.ConfirmEmail),
    switchMap((action: authAction.ConfirmEmail) => {
      return this.cognitoService
        .confirmEmail(action.payload.username, action.payload.code)
        .pipe(
          map(result => {
            console.log('result', result);
            return new authAction.ConfirmEmailSuccess();
          }),
          catchError(error => {
            console.log('error', error);
            return of(new authAction.ConfirmEmailFailed(error.message));
          })
        );
    })
  );

  @Effect()
  confirmEmailSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.ConfirmEmailSuccess),
    map((action: authAction.ConfirmEmailSuccess) => {
      return new uiAction.SnackbarShow({
        message: 'Successfully confirmed email!',
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
  //           return of(new authAction.SignInFailed(error));
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
