import { MaterialModule } from './material.module';
import { MulpericardModule } from './components/mulpericard/mulpericard.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { components } from './components';
import { pipes } from './pipes';
@NgModule({
  declarations: [...components, ...pipes],
  imports: [
    CommonModule,
    RouterModule,
    MulpericardModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ...components,
    ...pipes,
    MulpericardModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
