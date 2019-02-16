import { CognitoService } from '../../../auth/services/cognito.service';
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
  signIn$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignIn),
    switchMap((action: authAction.SignIn) =>
      this.cognitoService
        .authenticate(action.payload.username, action.payload.password)
        .pipe(
          map((session: any) => {
            // console.log(session);
            // if (user.challengeName === 'NEW_PASSWORD_REQUIRED')) {}
            return new authAction.SignInSuccess({
              username: session.getIdToken().payload['cognito:username'],
              email: session.getIdToken().payload.email
            });
          }),
          catchError((error: any) =>
            of(new authAction.SignInFailed(error.message))
          )
        )
    )
  );

  @Effect()
  signInFailed$: Observable<Action> = this.actions$.pipe(
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
          // console.log('auth effect: Session exists: ', result);
          return new authAction.SignInSuccess({
            username: result.getIdToken().payload['cognito:username'],
            email: result.getIdToken().payload.email
          });
        }),
        catchError(error => {
          // console.log('auth effect: Session not exist');
          return of(new authAction.SessionNotExist());
        })
      );
    })
  );

  @Effect()
  signOut$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignOut),
    map((action: authAction.SignOut) => {
      this.cognitoService.signOut();
      return new authAction.SignOutSuccess();
    })
  );

  @Effect()
  signOutSuccess$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignOutSuccess),
    map(() => {
      this.router.navigate(['/']);
      return new uiAction.SnackbarShow({
        message: 'Bye bye!',
        color: 'neutral'
      });
    })
  );

  @Effect()
  signInSuccess$: Observable<any> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignInSuccess),
    map(() => {
      this.router.navigate(['/posts']);
      return new uiAction.SnackbarShow({
        message: 'Welcome back!',
        color: 'neutral'
      });
    })
  );

  @Effect()
  signUp$: Observable<Action> = this.actions$.pipe(
    ofType(authAction.ActionTypes.SignUp),
    switchMap((action: authAction.SignUp) => {
      return this.cognitoService
        .signUp(
          action.payload.username,
          action.payload.password,
          action.payload.attributes
        )
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
        .confirmSignUp(action.payload.username, action.payload.code)
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
