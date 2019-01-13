import { CognitoService } from './cognito.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, concatMap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  public getPosts(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((array: any[]) => {
        return array.map(post => ({
          id: post.id,
          date: moment.unix(post.date).format('YYYY-MM-DD'),
          author: post.author,
          body: post.body
        }));
      })
    );
  }

  public savePost(post: string): Observable<any> {
    return this.cognitoService.getAccessToken().pipe(
      concatMap(accessToken => {
        return this.http.post(
          'http://localhost:3000/posts',
          { post },
          {
            headers: {
              Authorization: accessToken.jwtToken
            }
          }
        );
      })
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + 'kakka');
    console.log(headers);
    return headers;
  }
}
