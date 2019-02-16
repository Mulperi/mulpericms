import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as uiAction from '../actions/ui.actions';

@Injectable()
export class UiEffects {
  @Effect()
  snackbarShow$: Observable<Action> = this.actions$.pipe(
    ofType(uiAction.ActionTypes.SnackbarShow),
    delay(3000),
    map((action: any) => new uiAction.SnackbarHide())
  );

  constructor(private actions$: Actions) {}
}
