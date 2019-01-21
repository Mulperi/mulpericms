import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../../core/store';
import * as fromAuth from '../../../core/store/selectors/auth.selectors';
import * as authAction from '../../../core/store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  username$: Observable<string> = this.store.select(fromAuth.selectUsername);
  confirmed$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthEmailConfirmed
  );
  confirming$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthEmailConfirming
  );
  confirmationError: null | string;
  confirmationErrorSub: Subscription;

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {
    this.confirmationErrorSub = this.store
      .select(fromAuth.selectAuthEmailConfirmationError)
      .subscribe((error: null | string) => (this.confirmationError = error));
  }

  onClickConfirm(username: string, code: string) {
    this.store.dispatch(new authAction.ConfirmEmail({ username, code }));
  }

  ngOnDestroy() {
    this.confirmationErrorSub.unsubscribe();
  }
}
