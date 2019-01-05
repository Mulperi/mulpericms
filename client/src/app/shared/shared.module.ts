import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent, HeaderComponent],
  imports: [RouterModule],
  exports: [ToolbarComponent, HeaderComponent]
})
export class SharedModule {}
