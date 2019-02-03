import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromUi from '../../store/selectors/ui.selectors';
import { Observable, Subscription } from 'rxjs';
import * as postAction from '../../store/actions/post.actions';
import * as authAction from '../../store/actions/auth.actions';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, bottom: 0 }),
        animate(300, style({ opacity: 1, bottom: '0%' }))
      ]),
      transition(':leave', [animate(300, style({ opacity: 0, bottom: 0 }))])
    ])
  ]
})
export class CoreComponent implements OnInit {
  showSnackbar$: Observable<boolean> = this.store.select(
    fromUi.selectSnackbarVisible
  );
  snackbarMessage$: Observable<{
    message: string;
    color: string;
  }> = this.store.select(fromUi.selectSnackbarMessage);

  snackbarMessage: { message: string; color: string };

  snackbarMessageSub: Subscription;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(new postAction.LoadAll());
    this.store.dispatch(new authAction.SessionCheck());
    this.snackbarMessageSub = this.store
      .select(fromUi.selectSnackbarMessage)
      .subscribe(data => (this.snackbarMessage = data));
  }

  ngOnDrestroy() {
    this.snackbarMessageSub.unsubscribe();
  }
}
