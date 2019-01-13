import { MulpericardModule } from './components/mulpericard/mulpericard.module';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
    SnackbarComponent
  ],
  imports: [CommonModule, RouterModule, MulpericardModule],
  exports: [
    ToolbarComponent,
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
    MulpericardModule,
    SnackbarComponent
  ]
})
export class SharedModule {}
