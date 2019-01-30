import { MaterialModule } from './material.module';
import { MulpericardModule } from './components/mulpericard/mulpericard.module';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    ToolbarComponent,
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MulpericardModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ToolbarComponent,
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
    MulpericardModule,
    SnackbarComponent,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
