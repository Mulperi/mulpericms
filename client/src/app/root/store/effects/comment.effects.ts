import { CommentService } from '../../../posts/services/comment.service';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, concatMap, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as commentAction from '../actions/comment.actions';
import * as uiAction from '../actions/ui.actions';
import { Router } from '@angular/router';
import { CommentDTO } from '../../../shared/models/comment.model';

@Injectable()
export class CommentEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.Load),
    concatMap((action: commentAction.Load) =>
      this.commentService.getComments()
    ),
    map((comments: any) => new commentAction.LoadSuccess(comments)),
    catchError(error =>
      of(
        new commentAction.LoadFailed('Could not load comments from the server.')
      )
    )
  );

  @Effect()
  loadSuccess$: Observable<any> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.LoadFailed),
    map(
      (action: any) =>
        new uiAction.SnackbarShow({
          message: 'Could not load comments :(',
          color: 'warn'
        })
    )
  );
  @Effect()
  loadFailed$: Observable<any> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.LoadFailed),
    map(
      (action: any) =>
        new uiAction.SnackbarShow({
          message: 'Could not load comments :(',
          color: 'warn'
        })
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private commentService: CommentService
  ) {}
}
