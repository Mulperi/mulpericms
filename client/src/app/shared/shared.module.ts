import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { components } from './components';
import { pipes } from './pipes';
import { directives } from './directives';

import { MulpericardModule } from './components/mulpericard/mulpericard.module';

@NgModule({
  declarations: [...components, ...pipes, ...directives],
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
    ...directives,
    MulpericardModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
