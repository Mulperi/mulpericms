import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditorFeatureComponent } from './containers/editor-feature/editor-feature.component';

const routes = [
  {
    path: '',
    component: EditorFeatureComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {}
