import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule],
  exports: [MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule]
})
export class MaterialModule {}
