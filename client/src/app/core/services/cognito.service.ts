import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';

import { Auth } from 'aws-amplify';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  public authenticate(username: string, password: string): Observable<any> {
    return from(Auth.signIn(username, password)).pipe(
      catchError(error => throwError(error))
    );
  }

  public completeNewPassowrd(user: any, newPassword: string): Observable<any> {
    return from(
      Auth.completeNewPassword(
        user, // Cognito User Object
        newPassword, // New password
        {}
      )
    ).pipe(catchError(error => throwError(error)));
  }

  public getSession() {
    return from(Auth.currentSession()).pipe(
      catchError(error => throwError(error))
    );
  }

  public getAccessToken() {
    return from(Auth.currentSession()).pipe(
      map((session: any) => {
        return session.getAccessToken();
      }),
      catchError(error => throwError(error))
    );
  }

  // public async signin(username: string, password: string) {
  //   try {
  //     const user = await Auth.signIn(username, password);
  //     if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
  //       const { requiredAttributes } = user.challengeParam;

  //       const loggedUser = await Auth.completeNewPassword(
  //         user, // Cognito User Object
  //         'Testing12345!', // New password
  //         {}
  //       );
  //     } else {
  //       console.log('SUCCESS', user);
  //     }
  //   } catch (err) {
  //     if (err.code === 'UserNotConfirmedException') {
  //     } else if (err.code === 'PasswordResetRequiredException') {
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // }
}
