import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { containers } from './containers/index';
import { components } from './components';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MarkdownModule.forChild(),
    SharedModule
  ],
  exports: []
})
export class EditorModule {}
