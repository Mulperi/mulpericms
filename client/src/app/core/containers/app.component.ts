import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as fromUi from '../store/selectors/ui.selectors';
import { Observable } from 'rxjs';
import * as postActions from '../store/actions/post.actions';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, bottom: 0 }),
        animate(300, style({ opacity: 1, bottom: '5%' }))
      ]),
      transition(':leave', [animate(300, style({ opacity: 0, bottom: 0 }))])
    ])
  ]
})
export class AppComponent implements OnInit {
  showSnackbar$: Observable<boolean> = this.store.select(
    fromUi.selectSnackbarVisible
  );
  snackbarMessage$: Observable<{
    message: string;
    color: string;
  }> = this.store.select(fromUi.selectSnackbarMessage);

  snackbarMessage;

  snackbarMessageSub = this.store.select(fromUi.selectSnackbarMessage);

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(new postActions.LoadAll());
    this.snackbarMessageSub.subscribe(data => (this.snackbarMessage = data));
  }
}
