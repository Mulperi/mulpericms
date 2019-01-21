import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { NewPasswordComponent } from './newpassword/newpassword.component';

export const containers = [
  ConfirmEmailComponent,
  LoginComponent,
  NewPasswordComponent
];

export * from './login/login.component';
export * from './confirm-email/confirm-email.component';
export * from './newpassword/newpassword.component';
