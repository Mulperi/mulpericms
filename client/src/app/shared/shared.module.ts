import { MaterialModule } from './material.module';
import { MulpericardModule } from './components/mulpericard/mulpericard.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { components } from './components';
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    MulpericardModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [...components, MulpericardModule, MaterialModule, FlexLayoutModule]
})
export class SharedModule {}
