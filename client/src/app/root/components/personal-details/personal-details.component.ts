import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromStore from '../../store';
import * as fromAuth from '../../../root/store/selectors/auth.selectors';
import * as authAction from '../../../root/store/actions/auth.actions';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent {
  username$ = this.store.select(fromAuth.selectUsername);
  email$ = this.store.select(fromAuth.selectEmail);

  constructor(private store: Store<fromStore.State>) {}

  onClickSignOut() {
    this.store.dispatch(new authAction.SignOut());
  }
}
