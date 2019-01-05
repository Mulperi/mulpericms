import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [RouterModule],
  exports: [ToolbarComponent]
})
export class SharedModule {}
