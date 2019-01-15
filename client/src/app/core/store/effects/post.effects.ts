import { CognitoService } from './../../services/cognito.service';
import { PostService } from '../../services/post.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, concatMap, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as postAction from '../actions/post.actions';
import * as uiAction from '../actions/ui.actions';
import { Router } from '@angular/router';
import { of } from 'zen-observable';

@Injectable()
export class PostEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(postAction.ActionTypes.LoadAll),
    concatMap((action: postAction.LoadAll) => this.postService.getPosts()),
    map((posts: any) => new postAction.LoadAllSuccess(posts)),
    catchError(error =>
      of(new postAction.LoadAllFailed('Could not load posts from the server.'))
    )
  );

  @Effect()
  loadAllFailed$: Observable<any> = this.actions$.pipe(
    ofType(postAction.ActionTypes.LoadAllFailed),
    map(
      (action: any) =>
        new uiAction.SnackbarShow({
          message: 'Could not load posts :(',
          color: 'warn'
        })
    )
  );

  @Effect()
  savePost$: Observable<Action> = this.actions$.pipe(
    ofType(postAction.ActionTypes.SavePost),
    switchMap((action: any) =>
      this.postService.savePost(action.payload).pipe(
        map((result: any) => {
          return new postAction.SavePostSuccess(result);
        }),
        catchError(error => of(new postAction.SavePostFailed(error)))
      )
    )
  );

  @Effect()
  savePostSuccess$: Observable<any> = this.actions$.pipe(
    ofType(postAction.ActionTypes.SavePostSuccess),
    map((action: any) => {
      this.router.navigate(['/']);
      return new uiAction.SnackbarShow({
        message: 'Saved succesfully.',
        color: 'success'
      });
    })
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private postService: PostService,
    private cognitoService: CognitoService
  ) {}
}
