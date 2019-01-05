import { SharedModule } from './../shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsFeatureComponent } from './containers/posts-feature/posts-feature.component';
import { AllComponent } from './containers/all/all.component';
import { MulpericardModule } from './components/mulpericard/mulpericard.module';
import { PostComponent } from './containers/post/post.component';

@NgModule({
  declarations: [PostsFeatureComponent, AllComponent, PostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MulpericardModule,
    MarkdownModule.forChild(),
    SharedModule
  ],
  exports: []
})
export class PostsModule {}
