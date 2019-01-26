import * as express from 'express';
import * as jwt_decode from 'jwt-decode';
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
  const markdown = req.body.post;
  const username = jwt_decode(req.headers.authorization)['cognito:username'];
  postService
    .savePost(username, markdown)
    .subscribe(
      data => res.json(data),
      error => res.json({ error: error.message })
    );
});

export default posts;
