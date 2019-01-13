import { AuthGuardService } from './services/auth-guard.service';
import { ChangePasswordComponent } from './containers/changepassword/changepassword.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';

const routes = [
  {
    path: 'editor',
    loadChildren: '../editor/editor.module#EditorModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'posts',
    loadChildren: '../posts/posts.module#PostsModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  }

  //   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
