import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../../../root/store';
import * as fromAuth from '../../../root/store/selectors/auth.selectors';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );

  constructor(private store: Store<fromStore.State>) {}
}
