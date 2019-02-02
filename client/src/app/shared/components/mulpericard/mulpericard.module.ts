import { MulpericardInfoBarComponent } from './components/mulpericard-infobar/mulpericard-infobar.component';
import { NgModule } from '@angular/core';
import { MulpericardComponent } from './components/mulpericard/mulpericard.component';
import { MulpericardTitleComponent } from './components/mulpericard-title/mulpericard-title.component';
import { MulpericardSubtitleComponent } from './components/mulpericard-subtitle/mulpericard-subtitle.component';
import { MulpericardBodyComponent } from './components/mulpericard-body/mulpericard-body.component';
import { MulpericardActionsComponent } from './components/mulpericard-actions/mulpericard-actions.component';

@NgModule({
  imports: [],
  declarations: [
    MulpericardComponent,
    MulpericardTitleComponent,
    MulpericardSubtitleComponent,
    MulpericardBodyComponent,
    MulpericardActionsComponent,
    MulpericardInfoBarComponent
  ],
  exports: [
    MulpericardComponent,
    MulpericardTitleComponent,
    MulpericardSubtitleComponent,
    MulpericardBodyComponent,
    MulpericardActionsComponent,
    MulpericardInfoBarComponent
  ]
})
export class MulpericardModule {}
