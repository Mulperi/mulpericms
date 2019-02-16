import { CognitoService } from '../../../auth/services/cognito.service';
import { PostService } from '../../../posts/services/post.service';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, concatMap, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as postAction from '../actions/post.actions';
import * as uiAction from '../actions/ui.actions';
import { Router } from '@angular/router';
import { PostDTO } from '../../../shared/models/post.model';

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
  save$: Observable<Action> = this.actions$.pipe(
    ofType(postAction.ActionTypes.Save),
    switchMap((action: any) =>
      this.postService.savePost(action.payload).pipe(
        map((item: PostDTO) => {
          return new postAction.SaveSuccess(item);
        }),
        catchError(error => of(new postAction.SaveFailed(error)))
      )
    )
  );

  @Effect()
  saveSuccess$: Observable<any> = this.actions$.pipe(
    ofType(postAction.ActionTypes.SavePostSuccess),
    map((action: any) => {
      this.router.navigate(['/posts']);
      return new uiAction.SnackbarShow({
        message: 'Saved succesfully.',
        color: 'neutral'
      });
    })
  );

  @Effect()
  saveFailed$: Observable<any> = this.actions$.pipe(
    ofType(postAction.ActionTypes.SavePostFailed),
    map((action: any) => {
      return new uiAction.SnackbarShow({
        message: 'Saving failed!',
        color: 'warn'
      });
    })
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(postAction.ActionTypes.Delete),
    switchMap((action: any) =>
      this.postService.deletePost(action.payload).pipe(
        map((id: string) => {
          return new postAction.DeleteSuccess(id);
        }),
        catchError(error => of(new postAction.DeleteFailed(error)))
      )
    )
  );

  @Effect()
  deleteSuccess$: Observable<any> = this.actions$.pipe(
    ofType(postAction.ActionTypes.DeleteSuccess),
    map((action: any) => {
      return new uiAction.SnackbarShow({
        message: 'Post deleted.',
        color: 'neutral'
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
