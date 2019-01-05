import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [ToolbarComponent, HeaderComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [ToolbarComponent, HeaderComponent, SpinnerComponent]
})
export class SharedModule {}
