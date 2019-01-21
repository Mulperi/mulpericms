import { SignInComponent } from './signin/signin.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { NewPasswordComponent } from './newpassword/newpassword.component';

export const containers = [
  ConfirmEmailComponent,
  SignInComponent,
  NewPasswordComponent
];

export * from './signin/signin.component';
export * from './confirm-email/confirm-email.component';
export * from './newpassword/newpassword.component';
