import { SharedModule } from './../shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MarkdownModule.forChild(),
    SharedModule
  ],
  exports: []
})
export class PostsModule {}
