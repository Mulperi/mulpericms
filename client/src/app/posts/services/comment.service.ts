import { CognitoService } from '../../auth/services/cognito.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { concatMap, catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { CommentDTO } from './../../shared/models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  public getComments(): Observable<CommentDTO[]> {
    return this.http
      .get<CommentDTO[]>(`${environment.API}/comments`)
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

  public deleteComment(id: string): Observable<any> {
    return this.cognitoService.getIdToken().pipe(
      concatMap(token => {
        return this.http.delete(`${environment.API}/comments/${id}`, {
          headers: {
            Authorization: token.getJwtToken()
          }
        });
      })
    );
  }
}
