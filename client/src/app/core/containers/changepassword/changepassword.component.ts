import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../core/store';
import * as fromAuth from '../../../core/store/selectors/auth.selectors';
import * as authAction from '../../../core/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  requiredAttributes$: Observable<string[]> = this.store.select(
    fromAuth.selectAuthRequiredAttributes
  );

  username: string;

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit() {
    this.store
      .select(fromAuth.selectUsername)
      .subscribe((username: string) => (this.username = username));
  }

  onClickSave(
    oldPassword: string,
    newPassword: string,
    filledRequiredAttributes: string[]
  ) {
    const username = this.username;
    this.store.dispatch(
      new authAction.CompleteNewPassword({
        username,
        oldPassword,
        newPassword,
        filledRequiredAttributes: ['test']
      })
    );
  }
}
