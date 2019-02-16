import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../root/store';
import * as fromAuth from '../../../root/store/selectors/auth.selectors';
import * as authAction from '../../../root/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewPasswordComponent implements OnInit {
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
