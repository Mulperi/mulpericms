import { CognitoService } from '../../auth/services/cognito.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, concatMap, catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { PostDTO } from './../../shared/models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  public getPosts(): Observable<PostDTO[]> {
    return this.http
      .get<PostDTO[]>(`${environment.API}/posts`)
      .pipe(catchError(error => throwError(error)));
  }

  public savePost(payload: { body: string; tags: string[] }): Observable<any> {
    return this.cognitoService.getIdToken().pipe(
      concatMap(token => {
        return this.http.post(
          `${environment.API}/posts`,
          { post: payload },
          {
            headers: {
              Authorization: token.getJwtToken()
            }
          }
        );
      })
    );
  }

  public deletePost(id: string): Observable<any> {
    return this.cognitoService.getIdToken().pipe(
      concatMap(token => {
        return this.http.delete(`${environment.API}/posts/${id}`, {
          headers: {
            Authorization: token.getJwtToken()
          }
        });
      })
    );
  }

  // private createAuthorizationHeader(): HttpHeaders {
  //   const headers = new HttpHeaders();
  //   headers.append('Authorization', 'Basic ' + 'kakka');
  //   console.log(headers);
  //   return headers;
  // }
}
