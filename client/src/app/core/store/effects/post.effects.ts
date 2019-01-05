import { PostVO } from '../../../models/post-vo.model';
import { PostService } from '../../services/post.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as postActions from '../actions/post.actions';

@Injectable()
export class PostEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(postActions.ActionTypes.LoadAll),
    concatMap((x: any) => this.postService.getPosts()),
    map((posts: PostVO[]) => new postActions.LoadAllSuccess(posts))
  );

  constructor(private actions$: Actions, private postService: PostService) {}
}
