import { AuthGuardService } from '../auth/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import * as fromAuth from '../auth/containers';
import * as fromCore from './containers';

const routes = [
  {
    path: 'posts',
    loadChildren: '../posts/posts.module#PostsModule'
  },
  {
    path: 'editor',
    loadChildren: '../editor/editor.module#EditorModule'
    // canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: fromCore.ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'signin',
    component: fromAuth.SignInComponent
  },
  {
    path: 'newpassword',
    component: fromAuth.NewPasswordComponent
  },
  {
    path: 'confirmemail',
    component: fromAuth.ConfirmEmailComponent
  },
  {
    path: '',
    component: fromCore.LandingPageComponent,
    pathMatch: 'full'
  }

  //   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
