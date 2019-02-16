import { Injectable } from '@angular/core';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
  CognitoUserAttribute,
  CognitoAccessToken,
  CognitoIdToken
} from 'amazon-cognito-identity-js';
import { Observable, Observer, of, throwError } from 'rxjs';

const POOLDATA = {
  UserPoolId: 'eu-west-1_TLjYp1ZRG',
  ClientId: '776f6c2i0q791a4gq3279e8848'
};

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  user: CognitoUser;

  getUserPool(): CognitoUserPool {
    return new CognitoUserPool(POOLDATA);
  }

  /*
    Sign Up new user
    Example use of signUp
    this.cognitoService.signUp('mulperi', 'Testing12345!', [
        {
          Name: 'email',
          Value: 'mulperi@mydomain.com'
        }])
  */
  signUp(
    username: string,
    password: string,
    attributes: [{ Name: string; Value: string }]
  ): Observable<any> {
    const userPool = this.getUserPool();

    const attributeList = attributes.map(
      attribute => new CognitoUserAttribute(attribute)
    );

    return Observable.create((observer: Observer<any>) => {
      userPool.signUp(
        username,
        password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(result);
        }
      );
    });
  }

  confirmSignUp(username: string, code: string): Observable<any> {
    const userData = {
      Username: username,
      Pool: this.getUserPool()
    };
    this.user = new CognitoUser(userData);
    return Observable.create(observer => {
      this.user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          return observer.error(err);
        }
        observer.next(result);
      });
    });
  }

  /*
    Example use of authenticate (sign in)
    this.cognitoService.authenticate('mulperi2', 'Testing12345!')
    Possible error object codes
    code: "UserNotConfirmedException"
    TODO: MFA step
  */

  authenticate(
    username: string,
    password: string
  ): Observable<CognitoUserSession> {
    const userPool = this.getUserPool();
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });
    const userData = {
      Username: username,
      Pool: userPool
    };

    this.user = new CognitoUser(userData);

    return Observable.create((observer: Observer<any>) => {
      this.user.authenticateUser(authDetails, {
        onSuccess: result => {
          observer.next(result);
          // const accessToken = result.getAccessToken().getJwtToken();
          // const idToken = result.idToken.jwtToken;
          /* Use the idToken for Logins Map when Federating User Pool
           with identity pools or when passing through an Authorization Header
           to an API Gateway Authorizer*/
        },

        onFailure: err => observer.error(err),
        mfaRequired: (challengeName, challengeParameters) => {
          return observer.error('MFA :D');
          // cognitoUser.sendMFACode(confirmationCode, {
          //     onSuccess: result => this.onLoginSuccess(callback, result),
          //     onFailure: err => this.onLoginError(callback, err)
          // });
        }
      });
    });
  }

  /*
    TODO:
    Error: User is not authenticated
    https://github.com/amazon-archives/amazon-cognito-identity-js/issues/71
  */
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.user.changePassword(
        'Testing12345!',
        'Testing1234!',
        (err, result) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(result);
        }
      );
    });
  }

  /*
    getCurrentUser returns a Cognito user object if user is signed in
    or null-value if there is no current user
  */
  getCurrentUser(): Observable<CognitoUser | null> {
    return of(this.getUserPool().getCurrentUser());
  }

  getSessionValidity(): Observable<boolean> {
    const user: CognitoUser = this.getUserPool().getCurrentUser();

    if (user) {
      return Observable.create((observer: Observer<any>) => {
        user.getSession((err, session) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(session.isValid());
        });
      });
    } else {
      return of(false);
    }
  }

  getSession(): Observable<CognitoUserSession | null> {
    const user: CognitoUser = this.getUserPool().getCurrentUser();

    if (user) {
      return Observable.create((observer: Observer<any>) => {
        user.getSession((err, session) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(session);
        });
      });
    } else {
      return throwError(null);
    }
  }

  getAccessToken(): Observable<CognitoAccessToken> {
    const user: CognitoUser = this.getUserPool().getCurrentUser();

    if (user) {
      return Observable.create((observer: Observer<any>) => {
        user.getSession((err, session: CognitoUserSession) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(session.getAccessToken());
        });
      });
    } else {
      return throwError(null);
    }
  }

  getIdToken(): Observable<CognitoIdToken> {
    const user: CognitoUser = this.getUserPool().getCurrentUser();

    if (user) {
      return Observable.create((observer: Observer<any>) => {
        user.getSession((err, session: CognitoUserSession) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(session.getIdToken());
        });
      });
    } else {
      return throwError(null);
    }
  }

  signOut(): void {
    const user: CognitoUser = this.getUserPool().getCurrentUser();
    if (user != null) {
      user.signOut();
    }
  }
}
