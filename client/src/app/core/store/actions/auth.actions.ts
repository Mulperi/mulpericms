import { Action } from '@ngrx/store';

export enum ActionTypes {
  Login = '[Auth] Login ',
  LoginSuccess = '[Auth] Login Success',
  LoginFailed = '[Auth] Login Failed',
  NewPasswordRequired = '[Auth] New Password Required',
  CompleteNewPassword = '[Auth] Complete New Password',
  SessionCheck = '[Auth] Session Check',
  SignOut = '[Auth] Sign Out',
  SignOutSuccess = '[Auth] Sign Out Success'
}

export class Login implements Action {
  readonly type = ActionTypes.Login;
  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess;
  constructor(public payload: any) {}
}

export class LoginFailed implements Action {
  readonly type = ActionTypes.LoginFailed;
  constructor(public payload: any) {}
}

export class NewPasswordRequired implements Action {
  readonly type = ActionTypes.NewPasswordRequired;
  constructor(
    public payload: {
      username: string;
      requiredAttributes: string[];
      userAttributes: string[];
    }
  ) {}
}

export class CompleteNewPassword implements Action {
  readonly type = ActionTypes.CompleteNewPassword;
  constructor(
    public payload: {
      username: string;
      oldPassword: string;
      newPassword: string;
      filledRequiredAttributes: any[];
    }
  ) {}
}

export class SessionCheck implements Action {
  readonly type = ActionTypes.SessionCheck;
}

export class SignOut implements Action {
  readonly type = ActionTypes.SignOut;
}

export class SignOutSuccess implements Action {
  readonly type = ActionTypes.SignOutSuccess;
}

export type ActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailed
  | NewPasswordRequired
  | CompleteNewPassword
  | SessionCheck
  | SignOut
  | SignOutSuccess;
