import { Action } from '@ngrx/store';

export enum ActionTypes {
  Login = '[Auth] Login ',
  LoginSuccess = '[Auth] Login Success',
  LoginFailed = '[Auth] Login Failed',
  NewPasswordRequired = '[Auth] New Password Required',
  CompleteNewPassword = '[Auth] Complete New Password'
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

export type ActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailed
  | NewPasswordRequired
  | CompleteNewPassword;
