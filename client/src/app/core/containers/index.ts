import { CoreComponent } from './core/core.component';
import { LandingPageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './newpassword/newpassword.component';

export const containers = [
  LandingPageComponent,
  LoginComponent,
  NewPasswordComponent,
  CoreComponent
];

export * from './landingpage/landingpage.component';
export * from './login/login.component';
export * from './newpassword/newpassword.component';
export * from './core/core.component';
