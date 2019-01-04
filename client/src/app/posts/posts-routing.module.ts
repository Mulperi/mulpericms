import { AllComponent } from './containers/all/all.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostsFeatureComponent } from './containers/posts-feature/posts-feature.component';
import { PostComponent } from './containers/post/post.component';

const routes = [
  {
    path: '',
    component: PostsFeatureComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      {
        path: 'all',
        component: AllComponent
      },
      {
        path: ':id',
        component: PostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
