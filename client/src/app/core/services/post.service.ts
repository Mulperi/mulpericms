import { CognitoService } from '../../auth/services/cognito.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, concatMap, catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  public getPosts(): Observable<any> {
    return this.http
      .get<any>('https://mulpericms-api.herokuapp.com/posts')
      .pipe(
        map((array: any[]) => {
          return array.map(post => ({
            id: post.id,
            date: moment.unix(post.date).format('YYYY-MM-DD, h:mm'),
            author: post.author,
            body: post.body
          }));
        }),
        catchError(error => throwError(error))
      );
  }

  public savePost(post: string): Observable<any> {
    return this.cognitoService.getIdToken().pipe(
      concatMap(token => {
        return this.http.post(
          'https://mulpericms-api.herokuapp.com/posts',
          { post },
          {
            headers: {
              Authorization: token.getJwtToken()
            }
          }
        );
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
