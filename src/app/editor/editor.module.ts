import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorFeatureComponent } from './containers/editor-feature/editor-feature.component';

@NgModule({
  declarations: [EditorFeatureComponent],
  imports: [CommonModule, EditorRoutingModule, MarkdownModule.forChild()],
  exports: []
})
export class EditorModule {}
