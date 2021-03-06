import { Action } from '@ngrx/store';

export enum ActionTypes {
  SignIn = '[Auth] Sign In ',
  SignInSuccess = '[Auth] Sign In Success',
  SignInFailed = '[Auth] Sign In Failed',
  NewPasswordRequired = '[Auth] New Password Required',
  CompleteNewPassword = '[Auth] Complete New Password',
  SessionCheck = '[Auth] Session Check',
  SessionNotExist = '[Auth] Session Not Exist',
  SignOut = '[Auth] Sign Out',
  SignOutSuccess = '[Auth] Sign Out Success',
  SignUp = '[Auth] Sign Up',
  SignUpSuccess = '[Auth] Sign Up Success',
  SignUpFailed = '[Auth] Sign Up Failed',
  ConfirmEmail = '[Auth] Confirm Email',
  ConfirmEmailSuccess = '[Auth] Confirm Email Success',
  ConfirmEmailFailed = '[Auth] Confirm Email Failed'
}

export class SignIn implements Action {
  readonly type = ActionTypes.SignIn;
  constructor(public payload: { username: string; password: string }) {}
}

export class SignInSuccess implements Action {
  readonly type = ActionTypes.SignInSuccess;
  constructor(public payload: { username: string; email: string }) {}
}

export class SignInFailed implements Action {
  readonly type = ActionTypes.SignInFailed;
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
export class SessionNotExist implements Action {
  readonly type = ActionTypes.SessionNotExist;
}

export class SignOut implements Action {
  readonly type = ActionTypes.SignOut;
}

export class SignOutSuccess implements Action {
  readonly type = ActionTypes.SignOutSuccess;
}

export class SignUp implements Action {
  readonly type = ActionTypes.SignUp;
  constructor(
    public payload: {
      username: string;
      password: string;
      attributes?: any;
    }
  ) {}
}
export class SignUpSuccess implements Action {
  readonly type = ActionTypes.SignUpSuccess;
  constructor(public payload?: any) {}
}

export class SignUpFailed implements Action {
  readonly type = ActionTypes.SignUpFailed;
  constructor(public payload: string) {}
}

export class ConfirmEmail implements Action {
  readonly type = ActionTypes.ConfirmEmail;
  constructor(public payload: { username: string; code: string }) {}
}

export class ConfirmEmailSuccess implements Action {
  readonly type = ActionTypes.ConfirmEmailSuccess;
  constructor(public payload?: any) {}
}

export class ConfirmEmailFailed implements Action {
  readonly type = ActionTypes.ConfirmEmailFailed;
  constructor(public payload: string) {}
}

export type ActionsUnion =
  | SignIn
  | SignInSuccess
  | SignInFailed
  | NewPasswordRequired
  | CompleteNewPassword
  | SessionCheck
  | SignOut
  | SignOutSuccess
  | SignUp
  | SignUpSuccess
  | SignUpFailed
  | ConfirmEmail
  | ConfirmEmailSuccess
  | ConfirmEmailFailed;
