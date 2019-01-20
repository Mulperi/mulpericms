import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import * as fromAuth from '../../store/selectors/auth.selectors';
import * as authAction from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  username$: Observable<string> = this.store.select(fromAuth.selectUsername);
  confirmed$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthEmailConfirmed
  );
  confirming$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthEmailConfirming
  );

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {}

  onClickConfirm(username: string, code: string) {
    this.store.dispatch(new authAction.ConfirmEmail({ username, code }));
  }
}
