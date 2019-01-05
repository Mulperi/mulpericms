import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorFeatureComponent } from './containers/editor-feature/editor-feature.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EditorFeatureComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MarkdownModule.forChild(),
    SharedModule
  ],
  exports: []
})
export class EditorModule {}
