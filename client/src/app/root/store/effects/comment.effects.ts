import { CommentService } from '../../../posts/services/comment.service';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, concatMap, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as commentAction from '../actions/comment.actions';
import * as uiAction from '../actions/ui.actions';
import { Router } from '@angular/router';
import {
  CommentDTO,
  CommentDeleteSuccessResponse
} from '../../../shared/models/comment.model';

@Injectable()
export class CommentEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.LoadAll),
    concatMap((action: commentAction.LoadAll) =>
      this.commentService.getAllComments()
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
    ofType(commentAction.ActionTypes.LoadAllSuccess),
    map(
      (action: any) =>
        new uiAction.SnackbarShow({
          message: 'All comments loaded.',
          color: 'neutral'
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
  load$: Observable<Action> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.Load),
    concatMap((action: commentAction.Load) =>
      this.commentService.getCommentsForPost(action.payload)
    ),
    map((comments: any) => new commentAction.LoadSuccess(comments)),
    catchError(error =>
      of(
        new commentAction.LoadFailed('Could not load comments from the server.')
      )
    )
  );

  // @Effect()
  // loadSuccess$: Observable<any> = this.actions$.pipe(
  //   ofType(commentAction.ActionTypes.LoadSuccess),
  //   map(
  //     (action: any) =>
  //       new uiAction.SnackbarShow({
  //         message: 'Comments loaded.',
  //         color: 'neutral'
  //       })
  //   )
  // );

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
      return new uiAction.SnackbarShow({
        message: 'Comment saved.',
        color: 'neutral'
      });
    })
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.Delete),
    switchMap((action: any) =>
      this.commentService.deleteComment(action.payload).pipe(
        map((response: CommentDeleteSuccessResponse) => {
          return new commentAction.DeleteSuccess(response);
        }),
        catchError(error => of(new commentAction.DeleteFailed(error)))
      )
    )
  );

  @Effect()
  deleteSuccess$: Observable<any> = this.actions$.pipe(
    ofType(commentAction.ActionTypes.DeleteSuccess),
    map((action: any) => {
      return new uiAction.SnackbarShow({
        message: 'Comment deleted.',
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
