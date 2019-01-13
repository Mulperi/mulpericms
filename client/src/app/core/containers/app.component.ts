import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as fromUi from '../store/selectors/ui.selectors';
import { Observable } from 'rxjs';
import * as postActions from '../store/actions/post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSnackbar$: Observable<boolean> = this.store.select(
    fromUi.selectSnackbarVisible
  );
  snackbarMessage$: Observable<string> = this.store.select(
    fromUi.selectSnackbarMessage
  );
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(new postActions.LoadAll());
  }
}
