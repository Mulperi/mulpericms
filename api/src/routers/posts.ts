import * as express from 'express';
import * as jwt_decode from 'jwt-decode';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
import { jwtVerify } from './../middleware/jwt-verify.middleware';
import PostService from '../services/post.service';

const postService = new PostService();
const posts: express.Router = express.Router();

posts.get('/', (req: express.Request, res: express.Response) => {
  postService.getAllPosts().subscribe(
    data => {
      res.json(data.Items);
    },
    error => res.json(error)
  );
});

posts.get('/:id', (req: express.Request, res: express.Response) => {
  postService.getPost(req.params.id).subscribe(
    data => {
      res.json(data.Item);
    },
    error => res.json(error)
  );
});

posts.post('/', jwtVerify, (req: express.Request, res: express.Response) => {
  const post = req.body.post;

  const item = {
    id: uuid(),
    author: jwt_decode(req.headers.authorization)['cognito:username'],
    date: moment().unix(),
    body: post.body,
    tags: post.tags
  };
  postService
    .savePost(item)
    .subscribe(
      data => res.json(item),
      error => res.json({ error: error.message })
    );
});

export default posts;
