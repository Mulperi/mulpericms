import { CognitoService } from '../../auth/services/cognito.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { concatMap, catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { CommentDTO, CommentVO } from './../../shared/models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  public getAllComments(): Observable<CommentDTO[]> {
    return this.http
      .get<CommentDTO[]>(`${environment.API}/comments`)
      .pipe(catchError(error => throwError(error)));
  }

  public getCommentsForPost(postId: string): Observable<CommentDTO[]> {
    return this.http
      .get<CommentDTO[]>(`${environment.API}/comments/${postId}`)
      .pipe(catchError(error => throwError(error)));
  }

  public saveComment(payload: {
    body: string;
    tags: string[];
  }): Observable<any> {
    return this.cognitoService.getIdToken().pipe(
      concatMap(token => {
        return this.http.post(
          `${environment.API}/comments`,
          { comment: payload },
          {
            headers: {
              Authorization: token.getJwtToken()
            }
          }
        );
      })
    );
  }

  public deleteComment(comment: CommentVO): Observable<any> {
    return this.cognitoService.getIdToken().pipe(
      concatMap(token => {
        return this.http.delete(
          `${environment.API}/comments/${comment.postId}$${comment.id}`,
          {
            headers: {
              Authorization: token.getJwtToken()
            }
          }
        );
      })
    );
  }
}
