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
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.LoadAll),
    concatMap((action: commentAction.LoadAll) =>
      this.commentService.getComments()
    ),
    map((comments: any) => new commentAction.LoadAllSuccess(comments)),
    catchError(error =>
      of(
        new commentAction.LoadAllFailed(
          'Could not load comments from the server.'
        )
      )
    )
  );

  @Effect()
  loadAllSuccess$: Observable<any> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.LoadAllFailed),
    map(
      (action: any) =>
        new uiAction.SnackbarShow({
          message: 'Could not load comments :(',
          color: 'warn'
        })
    )
  );
  @Effect()
  loadAllFailed$: Observable<any> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.LoadAllFailed),
    map(
      (action: any) =>
        new uiAction.SnackbarShow({
          message: 'Could not load comments :(',
          color: 'warn'
        })
    )
  );

  @Effect()
  save$: Observable<any> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.Save),
    switchMap((action: any) =>
      this.commentService.saveComment(action.payload).pipe(
        map((item: CommentDTO) => {
          return new commentAction.SaveSuccess(item);
        }),
        catchError(error => of(new commentAction.SaveFailed(error)))
      )
    )
  );

  @Effect()
  saveSuccess$: Observable<any> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.SaveSuccess),
    map((action: any) => {
      this.router.navigate(['/posts']);
      return new uiAction.SnackbarShow({
        message: 'Commented succesfully.',
        color: 'neutral'
      });
    })
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private commentService: CommentService
  ) {}
}
