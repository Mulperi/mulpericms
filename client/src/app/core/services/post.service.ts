import { PostDTO } from '../../models/post-dto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { PostVO } from 'src/app/models/post-vo.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostVO[]> {
    return this.http.get<PostDTO[]>('http://localhost:3000/posts').pipe(
      map((array: any[]) => {
        return array.map(post => ({
          id: post.id,
          title: post.title,
          date: moment.unix(post.date).format('YYYY-MM-DD'),
          author: post.author,
          body: post.body
        }));
      })
    );
  }
}
